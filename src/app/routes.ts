export interface Route {
  id: string;
  name: string;
  path: string;
  category?: string;
  description?: string;
}

export const formRoutes: Route[] = [
  {
    id: 'vanilla',
    name: 'Vanilla Form',
    path: '/forms/vanilla',
    category: 'Basic',
    description: 'A simple vanilla JavaScript form'
  },
  {
    id: 'react',
    name: 'React Form',
    path: '/forms/react',
    category: 'Advanced',
    description: 'A form built with React'
  },
  {
    id: 'react-dnd',
    name: 'React DnD Form',
    path: '/forms/react_dnd',
    category: 'Advanced',
    description: 'A form with drag and drop functionality'
  },
  {
    id: 'scratch',
    name: 'Scratch Form',
    path: '/forms/scratch',
    category: 'Experimental',
    description: 'An experimental form from scratch'
  },
  {
    id: 'scratch-base',
    name: 'Scratch Base Form',
    path: '/forms/scratch_base',
    category: 'Experimental',
    description: 'Another experimental form'
  },
  {
    id: 'test',
    name: 'Test Form',
    path: '/forms/test',
    category: 'Testing',
    description: 'A form for testing purposes'
  },
  // Add more routes as needed
];
