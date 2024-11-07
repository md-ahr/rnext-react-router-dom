import { redirect } from "react-router-dom";

import { createContact, deleteContact, updateContact } from "../data/contacts";

export async function createNewContact() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function updateExistingContact({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export async function updateFavorite({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export async function deleteExistingContact({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}
