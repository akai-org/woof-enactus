import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import AboutUs1 from "@/assets/about-us-1.png";
import { FiCoffee } from "react-icons/fi";

export default function SupportPage() {
  return (
    <Box bgColor="brand.100">
      <Container py={20}>
        <Card.Root
          borderColor="black"
          padding={{ base: "1", sm: "6", md: "10" }}
        >
          <Card.Header>
            <Heading
              color="brand.500"
              size={{ base: "3xl", md: "5xl" }}
              fontWeight="600"
              mb="6"
            >
              Chcesz wesprzeć nasz projekt?
            </Heading>
          </Card.Header>
          <Card.Body>
            <Flex
              alignItems="flex-start"
              flexDirection={{ base: "column-reverse", md: "row" }}
              gap="20px"
            >
              <Box flex={1} width={{ base: "100%", md: "50%" }} padding="20px">
                <Card.Description lineHeight="25px" fontWeight="500" asChild>
                  <Text>
                    lacinia non. Sed dignissim tortor ac sapien volutpat
                    pretium. Donec tincidunt mauris risus, id interdum nulla
                    consectetur eget. Curabitur sit amet massa nec jestem gejem
                    justo tempus dignissim sed id lacus. Proin dignissim mi in
                    nisi mollis, in imperdiet dui viverra. Integer tristique
                    porttitor tristique. Nulla nec commodo turpis. Mauris vitae
                    dictum est. Aenean a felis ac velit condimentum vestibulum
                    id nec magna. Ut et velit id erat finibus porttitor at id
                    sem. Sed vulputate tempor ex eget molestie. Etiam nibh
                    ligula, blandit ornare magna laoreet, iaculis laoreet eros.
                    Aliquam tempor sollicitudin iaculis. Praesent sit amet massa
                    id felis mattis ultrices id faucibus eros. Sed et urna arcu.
                    Integer ut elit sit amet magna vestibulum pulvinar. Fusce id
                    lacus vitae odio
                  </Text>
                </Card.Description>
              </Box>
              <Image
                width={{ base: "100%", md: "50%" }}
                src={AboutUs1.src}
                alt=""
                padding="5"
              />
            </Flex>
            <Button variant="cta" size="2xl" alignSelf="center" mt="8" asChild>
              <Link href="https://ko-fi.com" color="brand.100">
                <FiCoffee color="white" />
                Support us on Ko-fi
              </Link>
            </Button>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
