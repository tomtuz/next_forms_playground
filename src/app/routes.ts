export interface FormRoute {
  id: string
  name: string
  path: string
  category?: string
  description?: string | string[]
}

export const formRoutes: FormRoute[] = [
  {
    id: 'vanilla',
    name: 'Vanilla',
    path: '/forms/vanilla',
    category: 'Basic',
    description: ['No external libraries']
  },

  {
    id: 'react',
    name: 'Form (React Hook Form)',
    path: '/forms/react',
    category: 'Basic',
    description: ['react-hook-form']
  },

  {
    id: 'react-dnd',
    name: 'Form (React Hook Form + DnD kit)',
    path: '/forms/react_dnd',
    category: 'Basic',
    description: ['react-hook-form', 'dnd-kit']
  },

  {
    id: 'scratch',
    name: 'Scratch Form',
    path: '/forms/scratch',
    category: 'Basic',
    description: ['Performant example from "react-form-hook"', 'More examples: https://github.com/react-hook-form/react-hook-form/tree/master/examples', 'Example name - "Array of Field Array"', 'https://codesandbox.io/p/sandbox/react-hook-form-usefieldarray-nested-arrays-m8w6j?file=%2Fsrc%2Findex.js']
  },

  {
    id: 'scratch-base',
    name: 'Scratch Base Form',
    path: '/forms/scratch_base',
    category: 'Basic',
    description: ['Re-written example of "Array of Field Array"']
  },

  {
    id: 'test',
    name: 'Combo tables',
    path: '/forms/test',
    category: 'Basic',
    description: ['A combination tables:', '"refs" table', 'native FormData API table',  'react-hook-form', 'react-hook-form (+devtools)']
  },

  {
    id: 'test-render-test',
    name: 'RenderTest',
    path: '/forms/test/render_test',
    category: 'Basic',
    description: ['Simple redraw counter', 'Simulates parts of "Form (React Hook Form)" structure']
  },

  // non-input routes

  {
    id: 'list',
    name: 'Data List',
    path: '/forms/list',
    category: 'Data',
    description: ['A table component "FormListTable".', 'Lists data from "FormContext" and localStorage', 'used mainly with "Vanilla']
  },

  {
    id: 'template',
    name: 'Template',
    path: '/forms/template',
    category: 'Other',
    description: ['Example form component, showing how tested input form should be displayed and work']
  },

  // State management in Next (mostly obsolete)

  {
    id: 'state',
    name: 'State management',
    path: '/test',
    category: 'State',
    description: ['Basically a clone of "Combo tables"']
  },

  {
    id: 'jotai',
    name: 'Jotai',
    path: '/test/state/jotai',
    category: 'State',
    description: ['Enables "jotai" devtools', 'State management in case of quick and complex solution', 'Probably will never be needed']
  },

  {
    id: 'zustand',
    name: 'Zustand',
    path: '/test/state/zustand',
    category: 'State',
    description: ['Enables "zustand" devtools', 'State management in case of quick and complex solution', 'Probably will never be needed']
  },

  // broken routes

  {
    id: 'other',
    name: 'Other',
    path: '/other/',
    category: 'Custom',
    description: ['A form for testing purposes']
  },
  {
    id: 'one_example',
    name: 'One Example',
    path: '/other/onexample',
    category: 'Custom',
    description: ['A form for testing purposes']
  },
  {
    id: 'dash',
    name: 'Dash',
    path: '/other/dash',
    category: 'Custom',
    description: ['A form for testing purposes']
  }
  // Add more routes as needed
]
