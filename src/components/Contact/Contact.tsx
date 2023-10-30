import emailIcon from "../../assets/email-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg";
import { Form } from "../Form/Form";
import { Container } from "./styles";

export function Contact() {
  return (
    <Container id="contact">
      <header>
        <h2>Contact me</h2>
        <p>
          If you've seen my potential or want to talk to me, don't hesitate to
          send me a message.
        </p>
      </header>
      <div className="contacts">
        <div>
          <img src={emailIcon} alt="Email" />
          <a href="mailto:abdennasseressati@gmail.com">
            abdennasseressati@gmail.com
          </a>
        </div>
      </div>
      <Form></Form>
    </Container>
  );
}
