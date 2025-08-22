import { useParams } from "react-router-dom";
import { Alert } from "@mui/material";

import { ContactForm } from "../features/contact/ContactForm";
import { useFetchSingle } from "../ui/hooks/UseFetchSingle.hook";
import { Contact } from "../features/contact/Contact.model";
import { API_CONFIG } from "../api/api.config";
import { Loading } from "../ui/components/Loading";

const { ENDPOINTS: { CONTACTS } } = API_CONFIG;

export const EditContactPage = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetchSingle({ url: CONTACTS.DETAIL(id as string) });

  const contact = data as Contact;
  
  if (loading) return <Loading />;
  if (error) return <Alert severity="error">Error: {error}</Alert>;
  if (!data) return <Alert severity="warning">No data found.</Alert>;

  return (
    <>
      <h1>Edit contact</h1>
      <ContactForm contact={contact} />
    </>
  )
};
