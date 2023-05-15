import Image from "next/image";
// images
import ErrorImg from "@/assets/images/404.png";
// styles
import { Container } from "@/components/Loader/styles";

export default function Error404() {
  return (
    <Container>
      <Image
        src={ErrorImg}
        width={200}
        height={150}
        alt="error-404"
        priority
      />
      <h2>404 - Page Not Found</h2>
    </Container>
  );
}
