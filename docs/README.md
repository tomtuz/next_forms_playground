## FormBuilder

FormBuilder allows to create forms out of different types of inputs.

**Challenges**:

- Dynamic rendering of different types of input components
- Standardization and reuse of components with different structures
- Synchronization of data from multiple dynamic components
- Performance overheads / excessive redraw issues

**Structure:**

```
Basic structure of forms can be expressed as:

> Form
  > Header
  -------------
  > Question
    > Title
    > AnswerTypeSelector
    > AnswerInput
  ...

  Answer types:
    <'text' | 'number' | 'textarea' | 'checkbox' | 'file' | 'select'>

  * Answer fields are disabled during editing (except for multi-option answers, to configure choices)
```

**Workflow**:

- To track all dynamically loaded FormField states within a Form, we employ `useFormData` hook.
- `useFormData` hook contains all current 'Form' data
- `useFormData` also holds event callbacks, used as props, to update the state of data.

  **Event callbacks**:

  - handleHeaderChange - update Header onChange
  - handleFieldChange - update FormField onChange

--

**Component folder structure changes (shadnCN UI)**:

- shadCN UI natively installed components are replaced to `./src/cn/ui` with an alias `@/cn`:

Usage example:

```jsx
// UI -- custom components
import { FormField } from '@/components/field/FormField'
import { FormHeader } from '@/components/field/FormHeader'

// CN UI -- external and native
import { Button } from '@/cn/ui/button'
import { Separator } from '@/cn/ui/separator'
import { useToast } from '@/cn/ui/use-toast'
```

**\* This was done to increase the distinction between different types of components and reduce clutter**

**Linting/Formatting**:

- Prettier:

  - auto formatting (by default)
  - TailwindCSS class auto sort plugin
  - printWidth reduced to support multi pane widths

- Eslint:
  - Extended default rules to support Airbnb syntax linting rules
  - Specified ESlint to auto fix lint errors and add missing imports

# Input rendering

Rendering multiple controlled inputs is a performance heavy task.

There are heavy and complex solutions built to solve this exact issue.
To appreciate the scope of input handling I recommend reading the entire page of:
https://formilyjs.org/guide

- When **not tracking** input states, we can have 0 redraws.
- When **tracking** input states, if not careful, we can have hundreds of redraws while typing in a single input field.

Rendering multiple controlled inputs is usually done by rendering an array of input elements.

The input state can be retrieved by passing state update handlers as props (which in itself doesn't cause a redraw), however, since form data is usually stored in a source, slightest, suboptimal state handling will inadvertently cause react v-DOM diff checker to detect a component state change and redraw.

To battle this, packages such as `react-hook-form` use refs to communicate with DOM API natively, additionally using lazy form management and state update batching.

## Lazy form management (Vanilla)

If form use cases do not require immediate form validation or reactive state changes with side effects we should consider lazy form management options. Using lazy management allows us to fetch data lazily, prevent composite redraws, and in some cases greatly reduces code complexity.

Lazy management approaches:

- store each input **ref** values and retrieve all of their data on form submit.
- use the official **FormData API** to retrieve the form data on form submit.

Refs vs FormData:

- Storing `ref` values would allows us to focus and reference elements easily, but introduces code complexity as we have to track and manage ref values and there are many pitfalls, when dealing with refs. It would be possible to implement active validation using refs. (Best to abstract `ref` state management complexity with a dedicated package)
- Using FormData API would not allow us to focus or reference values. For input validation, you might have to revert to browser inbuilt validation API.

## List virtualization

In theory, if we have a big list of inputs, we could try to optimize the rendering of it with the use of window virtualization.
I.e. 'react-window' package.
Virtualization works by only rendering the elements that are visible in the viewport and ignoring the values that are not.

# Drag and drop (DND) functionality

We have two options:

- robust and performant `react-beautiful-dnd`
- modern and easy to use `dnd-kit`

Comparison:

- `dnd-kit`: ease of use and out of the box appearance, which is great for small projects.
- `react-beautiful-dnd`: aims for performance and low level customization, for this reason, development experience might have a steeper learning curve, requiring more manual customization, thus being more fit for enterprise grade solutions.
- `react-beautiful-dnd`: industry standard for a long time, but currently Atlassian focuses on other priorities and the development could be considered to be in a stale state.

# React Hooks Form:

There are a couple of ways to manage form state with the help of react-hook-form.

**Regular approach:** pass props normally (prop drilling)

**Problems with regular approach:**

- verbose
- might require early adoption of state management
- do not explicitly isolate the scopes of functionality, which is the leading cause of rerender issues, as states that crosses scopes of components are bound to cause redraws.

**With react-hook-form we can use:**

- a centralized useFormState hook which would hold all the state management functionality in one place
- a FormProvider to pass context of the form without prop drilling, with useFormContext

**Problems with centralized useFormState hook:**

1. this hook will end up holding multiple react-hook-form hooks, event update handler functions all of which will be used somwhere else and will need to be 'tracked down' when something goes wrong while reviewing each component individually. So its simpler to setup, than to debug.

**Problems with centralized useFormState hook:**

1. Using useFormContext hook could be considered an antipattern, because it decouples strong links between components and does not give immediate updates, when changed values do not represent the correct structure. So its easier to make mistakes.
