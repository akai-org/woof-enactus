import { Box, Card, Container, Grid, Heading } from "@chakra-ui/react";
import Image from "next/image";
import AboutUs1 from "@/assets/about-us-1.png";
import AboutUs2 from "@/assets/about-us-2.png";
import AboutUs3 from "@/assets/about-us-3.png";
import AboutUs4 from "@/assets/about-us-4.png";
import AboutUsBg from "@/assets/about-us-bg.png";

const images = [AboutUs1, AboutUs2, AboutUs3, AboutUs4];

export default function AboutUsPage() {
  return (
    <Box
      backgroundImage={`url('${AboutUsBg.src}')`}
      backgroundSize="auto"
      bgColor="brand.700"
    >
      <Container gap={20} display="flex" flexDirection="column" py={20}>
        <Card.Root>
          <Card.Header>
            <Heading color="brand.500" size="3xl">
              Poznaj naszą misje!
            </Heading>
          </Card.Header>
          <Card.Body>
            <Card.Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              tempus condimentum orci, vel suscipit nisi pellentesque sit amet.
              Quisque volutpat mauris non aliquam sagittis. Maecenas eget enim
              elementum, faucibus leo eu, volutpat lorem. Cras consequat ligula
              ut blandit accumsan. Quisque pulvinar placerat neque, non
              fermentum nisl finibus a. Nunc rhoncus consectetur lectus.
              Praesent at orci dictum, egestas tortor sed, consequat ipsum. Sed
              eget leo nec metus blandit ultricies. Curabitur ut tellus lacus.
              Morbi lectus arcu, condimentum in volutpat vel, dictum quis
              libero. Sed quis lorem rhoncus, lobortis massa et, pellentesque
              risus. Curabitur dapibus tellus eget sem commodo semper. Aenean
              ultricies nibh ipsum, quis ultrices justo lacinia non. Sed
              dignissim tortor ac sapien volutpat pretium. Donec tincidunt
              mauris risus, id interdum nulla consectetur eget. Curabitur sit
              amet massa nec justo tempus dignissim sed id lacus. Proin
              dignissim mi in nisi mollis, in imperdiet dui viverra. Integer
              tristique porttitor tristique. Nulla nec commodo turpis. Mauris
              vitae dictum est. Aenean a felis ac velit condimentum vestibulum
              id nec magna. Ut et velit id erat finibus porttitor at id sem. Sed
              vulputate tempor ex eget molestie. Etiam nibh ligula, blandit
              ornare magna laoreet, iaculis laoreet eros. Aliquam tempor
              sollicitudin iaculis. Praesent sit amet massa id felis mattis
              ultrices id faucibus eros. Sed et urna arcu. Integer ut elit sit
              amet magna vestibulum pulvinar. Fusce id lacus vitae odio dictum
              fringilla. Nunc erat enim, sagittis at pretium quis, accumsan sed
              ligula. Nam turpis enim, consequat eu ligula quis, suscipit
              lobortis magna. Praesent aliquam, elit a placerat mattis, diam
              magna pellentesque mauris, id faucibus leo purus sed augue.
              Phasellus semper, urna vitae mollis cursus, elit turpis vehicula
              arcu, nec maximus ex massa et ante. Sed vulputate risus a viverra
              tempor. Sed accumsan finibus pulvinar.
            </Card.Description>
          </Card.Body>
        </Card.Root>
        <Card.Root
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        >
          <div>
            <Card.Header>
              <Heading color="brand.500" size="3xl">
                Kim jesteśmy? Odkryj nasz zespół!
              </Heading>
            </Card.Header>
            <Card.Body>
              <Card.Description>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                tempus condimentum orci, vel suscipit nisi pellentesque sit
                amet. Quisque volutpat mauris non aliquam sagittis. Maecenas
                eget enim elementum, faucibus leo eu, volutpat lorem. Cras
                consequat ligula ut blandit accumsan. Quisque pulvinar placerat
                neque, non fermentum nisl finibus a. Nunc rhoncus consectetur
                lectus. Praesent at orci dictum, egestas tortor sed, consequat
                ipsum. Sed eget leo nec metus blandit ultricies. Curabitur ut
                tellus lacus. Morbi lectus arcu, condimentum in volutpat vel,
                dictum quis libero. Sed quis lorem rhoncus, lobortis massa et,
                pellentesque risus. Curabitur dapibus tellus eget sem commodo
                semper. Aenean ultricies nibh ipsum, quis ultrices justo lacinia
                non. Sed dignissim tortor ac sapien volutpat pretium. Donec
                tincidunt mauris risus, id interdum nulla consectetur eget.
                Curabitur sit amet massa nec justo tempus dignissim sed id
                lacus. Proin dignissim mi in nisi mollis, in imperdiet dui
                viverra. Integer tristique porttitor tristique. Nulla nec
                commodo turpis. Mauris vitae dictum est. Aenean a felis ac velit
                condimentum vestibulum id nec magna. Ut et velit id erat finibus
                porttitor at id sem. Sed vulputate tempor ex eget molestie.
                Etiam nibh ligula, blandit ornare magna laoreet, iaculis laoreet
                eros. Aliquam tempor sollicitudin iaculis. Praesent sit amet
                massa id felis mattis ultrices id faucibus eros. Sed et urna
                arcu. Integer ut elit sit amet magna vestibulum pulvinar. Fusce
                id lacus vitae odio dictum fringilla. Nunc erat enim, sagittis
                at pretium quis, accumsan sed ligula. Nam turpis enim, consequat
                eu ligula quis, suscipit lobortis magna. Praesent aliquam, elit
                a placerat mattis, diam magna pellentesque mauris, id faucibus
                leo purus sed augue. Phasellus semper, urna vitae mollis cursus,
                elit turpis vehicula arcu, nec maximus ex massa et ante. Sed
                vulputate risus a viverra tempor. Sed accumsan finibus pulvinar.
              </Card.Description>
            </Card.Body>
          </div>
          <Grid templateColumns="1fr 1fr" gap={5} m="auto" py={5}>
            {images.map(i => (
              <Image
                key={i.src}
                src={i}
                placeholder="blur"
                alt="HauMaps Team photo"
                style={{ height: "200px", width: "200px" }}
              />
            ))}
          </Grid>
        </Card.Root>
        <Card.Root
          w={{ base: "full", md: "2/3" }}
          p={{ base: "0", md: "5" }}
          mx="auto"
          borderRadius={{ base: "4xl", md: "full" }}
        >
          <Card.Header textAlign="center">
            <Heading color="brand.500" size="3xl">
              Bądź z nami na bieżąco!
            </Heading>
          </Card.Header>
          <Card.Body>
            <Card.Description color="brand.700" fontWeight="semibold">
              Odwiedź nasz profil na platformie Instagram lub Facebook
              @woof_put! Jesteśmy również aktywni na LinkedIn jako @
            </Card.Description>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
