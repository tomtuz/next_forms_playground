export interface FormRoute {
  id: string
  name: string
  path: string
  category: string
  shortDescription: string
  longDescription: string
}

const shortDescription = '- No short information available'
const longDescription = '- No detailed information available'

export const prepareRoutes = (): FormRoute[] => {
  return [
    {
      id: 'vanilla',
      name: 'Vanilla',
      path: 'forms/vanilla',
      category: 'Basic',
      shortDescription,
      longDescription
    },

    {
      id: 'react',
      name: 'Form (React Hook Form)',
      path: 'forms/react',
      category: 'Basic',
      shortDescription,
      longDescription
    },

    {
      id: 'react-dnd',
      name: 'Form (React Hook Form + DnD kit)',
      path: 'forms/react_dnd',
      category: 'Basic',
      shortDescription,
      longDescription
    },

    {
      id: 'scratch',
      name: 'Scratch Form',
      path: 'forms/scratch',
      category: 'Basic',
      shortDescription,
      longDescription
    },

    {
      id: 'scratch-base',
      name: 'Scratch Base Form',
      path: 'forms/scratch_base',
      category: 'Basic',
      shortDescription,
      longDescription
    },

    {
      id: 'test',
      name: 'Combo tables',
      path: 'forms/test',
      category: 'Basic',
      shortDescription,
      longDescription
    },

    {
      id: 'test-render-test',
      name: 'RenderTest',
      path: 'forms/test/render_test',
      category: 'Basic',
      shortDescription,
      longDescription
    },

    // non-input routes

    {
      id: 'list',
      name: 'Data List',
      path: 'forms/list',
      category: 'Data',
      shortDescription,
      longDescription
    },

    {
      id: 'template',
      name: 'Template',
      path: 'forms/template',
      category: 'Other',
      shortDescription,
      longDescription
    },

    // State management in Next (mostly obsolete)

    {
      id: 'state',
      name: 'State management',
      path: 'test',
      category: 'State',
      shortDescription,
      longDescription
    },

    {
      id: 'jotai',
      name: 'Jotai',
      path: 'test/state/jotai',
      category: 'State',
      shortDescription,
      longDescription
    },

    {
      id: 'zustand',
      name: 'Zustand',
      path: 'test/state/zustand',
      category: 'State',
      shortDescription,
      longDescription
    },

    // broken routes

    {
      id: 'other',
      name: 'Other',
      path: 'other',
      category: 'Custom',
      shortDescription,
      longDescription
    },
    {
      id: 'one_example',
      name: 'One Example',
      path: 'other/onexample',
      category: 'Custom',
      shortDescription,
      longDescription
    },
    {
      id: 'dash',
      name: 'Dash',
      path: 'other/dash',
      category: 'Custom',
      shortDescription,
      longDescription
    }
  ]
}

export const formRoutes: FormRoute[] = prepareRoutes()
