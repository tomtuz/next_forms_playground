export interface FormRoute {
  id: string
  name: string
  path: string
  category?: string
  shortDescription: string;
  longDescription: string;
}

export const routesData: Omit<FormRoute, 'shortDescription' | 'longDescription'>[] = [
  {
    id: 'vanilla',
    name: 'Vanilla',
    path: '/forms/vanilla',
    category: 'Basic'
  },

  {
    id: 'react',
    name: 'Form (React Hook Form)',
    path: '/forms/react',
    category: 'Basic'
  },

  {
    id: 'react-dnd',
    name: 'Form (React Hook Form + DnD kit)',
    path: '/forms/react_dnd',
    category: 'Basic'
  },

  {
    id: 'scratch',
    name: 'Scratch Form',
    path: '/forms/scratch',
    category: 'Basic'
  },

  {
    id: 'scratch-base',
    name: 'Scratch Base Form',
    path: '/forms/scratch_base',
    category: 'Basic'
  },

  {
    id: 'test',
    name: 'Combo tables',
    path: '/forms/test',
    category: 'Basic'
  },

  {
    id: 'test-render-test',
    name: 'RenderTest',
    path: '/forms/test/render_test',
    category: 'Basic'
  },

  // non-input routes

  {
    id: 'list',
    name: 'Data List',
    path: '/forms/list',
    category: 'Data'
  },

  {
    id: 'template',
    name: 'Template',
    path: '/forms/template',
    category: 'Other'
  },

  // State management in Next (mostly obsolete)

  {
    id: 'state',
    name: 'State management',
    path: '/test',
    category: 'State'
  },

  {
    id: 'jotai',
    name: 'Jotai',
    path: '/test/state/jotai',
    category: 'State'
  },

  {
    id: 'zustand',
    name: 'Zustand',
    path: '/test/state/zustand',
    category: 'State'
  },

  // broken routes

  {
    id: 'other',
    name: 'Other',
    path: '/other',
    category: 'Custom'
  },
  {
    id: 'one_example',
    name: 'One Example',
    path: '/other/onexample',
    category: 'Custom'
  },
  {
    id: 'dash',
    name: 'Dash',
    path: '/other/dash',
    category: 'Custom'
  }
]
