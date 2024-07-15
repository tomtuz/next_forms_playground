## Builder page

Builder page allows to create forms out of different types of inputs.

**Challenges**:

- Dynamic rendering of different types of input components
- Standardization and reuse of components with different structures
- Synchronization, updating and saving data from multiple dynamic components

**Structure:**

```
> Form
  > FormHeader
  -------------
  > FormField
  > FormField
  > FormField

________________
> FormField
  > FormTypePicker
  > FormTypeRender (disabled/active)

  FormField types:
    <'text' | 'number' | 'textarea' | 'checkbox' | 'file' | 'select'>



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

When rendering multiple inputs that depened on controlled states you end up redrawing all of the inputs elements if they are held in one variable.
Using predefined placeholders would solve this, but we don't have a freedom to do this with custom forms.
In essence, we have to either:

- store each input ref values and retrieve all of their data on form submit.
- use the official FormData API to retrieve the form data on form submit.

Using these approaches allows us to fetch data lazily, prevent composite redraws, and reduce complexity.
Differences:

- Storing ref values would help to focus and reference elements, but introduce code complexity as we have to track and manage ref values.
- Using FormData API would not allow to focus or reference values and therefore would require additional implementation for active input validation (if as in most cases validation cannot be done lazily).
  To have active validation in this case we could employ inbuilt validation options, if we are not concerned about input comlexity.

https://dev.to/ajones_codes/a-better-guide-to-forms-in-react-47f0

In theory we could employ list virtualization (react-window)
Or use very advanced solution like:
https://formilyjs.org/guide/quick-start
