import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { getAllContacts, getSingleContact } from "./loader/contacts";

import {
  createNewContact,
  deleteExistingContact,
  updateExistingContact,
  updateFavorite,
} from "./actions/contacts";

import Contact from "./pages/Contact";
import EditContact from "./pages/EditContact";
import Error from "./pages/Error";
import Index from "./pages/Index";
import Root from "./pages/Root";

const routerJsx = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={getAllContacts}
      action={createNewContact}
      errorElement={<Error />}
    >
      <Route errorElement={<Error />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={getSingleContact}
          action={updateFavorite}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={getSingleContact}
          action={updateExistingContact}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={deleteExistingContact}
        />
      </Route>
    </Route>
  )
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: getAllContacts,
    action: createNewContact,
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "/contacts/:contactId",
            element: <Contact />,
            loader: getSingleContact,
            action: updateFavorite,
          },
          {
            path: "/contacts/:contactId/edit",
            element: <EditContact />,
            loader: getSingleContact,
            action: updateExistingContact,
          },
          {
            path: "/contacts/:contactId/destroy",
            action: deleteExistingContact,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

export { router, routerJsx };
