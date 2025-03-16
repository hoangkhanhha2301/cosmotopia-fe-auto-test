import { Helmet } from 'react-helmet-async';

export default function PageHead({ title = 'Cosmotopia' }) {
  return (
    <Helmet>
      <title> {title} </title>
    </Helmet>
  );
}
