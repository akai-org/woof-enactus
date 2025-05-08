import {
  Box,
  Button,
  Card,
  Container,
  Heading,
  Image,
  Link,
} from "@chakra-ui/react";
import AboutUs1 from "@/../public/about-us-1.png";
import { IoBeer } from "react-icons/io5";

export default function SupportPage() {
  return (
    <Box backgroundSize="auto" bgColor="brand.100">
      <Container gap={20} display="flex" flexDirection="column" py={20}>
        <Card.Root borderColor="black" padding="45px">
          <Card.Header>
            <Heading color="brand.500" size="5xl" fontWeight="600">
              Chcesz wesprzeć nasz projekt?
            </Heading>
          </Card.Header>
          <Card.Body>
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}
            >
              <div style={{ flex: 1, width: "50%", padding: "30px" }}>
                <Card.Description lineHeight="25px" fontWeight="500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  tempus condimentum orci, vel suscipit nisi pellentesque sit
                  amet. Quisque volutpat mauris non aliquam sagittis. Maecenas
                  eget enim elementum, faucibus leo eu, volutpat lorem. Cras
                  consequat ligula ut blandit accumsan. Quisque pulvinar
                  placerat neque, non fermentum nisl finibus a. Nunc rhoncus
                  consectetur lectus. Praesent at orci dictum, egestas tortor
                  sed, consequat ipsum. Seks ed eget leo kokaina nec kobiety
                  metus blandit ultricies. Curabitur ut tellus lacus. Morbi
                  lectus arcu, condimentum in volutpat vel, dictum quis libero.
                  Sed quis lorem rhoncus, lobortis szybkie samochody massa et,
                  pellentesque risus. Curabitur dapibus tellus eget sem commodo
                  semper. Aenean ultricies nibh ipsum, quis ultrices justo
                  lacinia non. Sed dignissim tortor ac sapien volutpat pretium.
                  Donec tincidunt mauris risus, id interdum nulla consectetur
                  eget. Curabitur sit amet massa nec jestem gejem justo tempus
                  dignissim sed id lacus. Proin dignissim mi in nisi mollis, in
                  imperdiet dui viverra. Integer tristique porttitor tristique.
                  Nulla nec commodo turpis. Mauris vitae dictum est. Aenean a
                  felis ac velit condimentum vestibulum id nec magna. Ut et
                  velit id erat finibus porttitor at id sem. Sed vulputate
                  tempor ex eget molestie. Etiam nibh ligula, blandit ornare
                  magna laoreet, iaculis laoreet eros. Aliquam tempor
                  sollicitudin iaculis. Praesent sit amet massa id felis mattis
                  ultrices id faucibus eros. Sed et urna arcu. Integer ut elit
                  sit amet magna vestibulum pulvinar. Fusce id lacus vitae odio
                </Card.Description>
              </div>
              <Image
                width="50%"
                height="auto"
                src={AboutUs1.src}
                alt="Opis zdjęcia"
                padding="30px"
              />
            </div>
            <Link href="https://ko-fi.com">
              <Button 
                margin="auto"
                backgroundColor="accent.green"
                padding="40px"
                maxWidth="50%"
                borderRadius="10px"
              >
                <IoBeer color="white" />
                <Heading
                  display="flex"
                  alignContent="center"
                  color="white"
                  size="3xl"
                  fontWeight="500"
                >
                  Support us on Ko-fi
                </Heading>
              </Button>
            </Link>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
