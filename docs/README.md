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
