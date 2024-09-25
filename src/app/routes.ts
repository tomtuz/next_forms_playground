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
    id: 'new',
    name: 'New',
    path: '/forms/new',
    category: 'Basic',
    description: ['A simple vanilla JavaScript form']
  },

  {
    id: 'scratch',
    name: 'Scratch Form',
    path: '/forms/scratch',
    category: 'Basic',
    description: ['An experimental form from scratch']
  },

  {
    id: 'scratch-base',
    name: 'Scratch Base Form',
    path: '/forms/scratch_base',
    category: 'Basic',
    description: ['Another experimental form']
  },

  {
    id: 'test',
    name: 'Test',
    path: '/forms/test',
    category: 'Basic',
    description: ['A form for testing purposes']
  },

  {
    id: 'test-render-test',
    name: 'RenderTest',
    path: '/forms/test/render_test',
    category: 'Basic',
    description: ['A form for testing purposes']
  },

  // non-input routes

  {
    id: 'list',
    name: 'Data List',
    path: '/forms/list',
    category: 'Data',
    description: ['A form for testing purposes']
  },

  {
    id: 'template',
    name: 'Template',
    path: '/forms/template',
    category: 'Other',
    description: ['Example of form structure for testing']
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
