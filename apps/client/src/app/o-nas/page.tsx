import Image from "next/image";
import { Box, Card, Container, Heading } from "@chakra-ui/react";
import AboutUsBg from "@/assets/about-us-bg.png";
import AboutUsImg from "@/../public/o-nas.jpg";

export default function AboutUsPage() {
  return (
    <Box
      backgroundImage={`url('${AboutUsBg.src}')`}
      backgroundSize="auto"
      bgColor="brand.700"
    >
      <Container
        gap={20}
        display="flex"
        flexDirection="column"
        py={20}
        maxWidth="breakpoint-lg"
      >
        <Card.Root padding={{ base: "0", sm: "4" }}>
          <Card.Header>
            <Heading color="brand.500" size="3xl">
              Poznaj naszą misje!
            </Heading>
          </Card.Header>
          <Card.Body>
            <Card.Description>
              Misją WOOF jest tworzenie realnych i trwałych możliwości niesienia
              pomocy zwierzętom poprzez innowacyjną aplikację internetową, która
              w sposób przemyślany i kompleksowy łączy ludzi dobrej woli ze
              schroniskami, organizacjami pro zwierzęcymi oraz lokalnymi
              inicjatywami. Naszym celem jest nie tylko poprawa warunków życia
              zwierząt w Polsce, ale przede wszystkim budowanie świadomego,
              empatycznego i odpowiedzialnego społeczeństwa poprzez tworzenie
              efektywnych i trwałych mostów pomiędzy wszystkimi, którym los
              zwierząt nie jest obojętny. Chcemy aktywnie wspierać współpracę
              między schroniskami i instytucjami a osobami prywatnymi czy
              firmami, ułatwiając im niesienie pomocy w sposób dostosowany do
              realnych potrzeb – od wolontariatu i wsparcia rzeczowego, po
              działania CSR. Wierzymy, że skuteczna pomoc zaczyna się od dostępu
              do rzetelnych informacji i intuicyjnych narzędzi, które
              umożliwiają optymalne wykorzystanie dostępnych zasobów.
            </Card.Description>
          </Card.Body>
        </Card.Root>
        <Card.Root padding={{ base: "0", sm: "4" }}>
          <Card.Header>
            <Heading color="brand.500" size="3xl">
              Kim jesteśmy? Odkryj nasz zespół!
            </Heading>
          </Card.Header>
          <Card.Body>
            <Card.Description pb={5}>
              Jesteśmy zespołem studentów z Politechniki Poznańskiej, których
              połączyła wspólna misja: realna pomoc zwierzętom poprzez
              nowoczesne technologie. HauMaps to dla nas coś więcej niż
              aplikacja - to odpowiedź na potrzebę działania, która łączy
              empatię z wiedzą. W naszym zespole znajdziesz wszystkich
              zaangażowanych w tworzenie narzędzia, które realnie zmienia świat
              zwierząt na lepsze. Wierzymy, że technologia może być siłą
              napędową dobra, a innowacyjne rozwiązania – mostem między ludźmi a
              potrzebującymi zwierzętami. Działamy z pasją, odpowiedzialnością i
              wiarą, że wspólnie,jako społeczność, możemy więcej. Poznaj nas
              bliżej i zobacz, kto stoi za projektem WOOF!
            </Card.Description>
            <Image
              src={AboutUsImg}
              placeholder="blur"
              alt="HauMaps Team photo"
              style={{width: "100%", height: "auto"}}
            />
          </Card.Body>
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
            <Card.Description
              color="brand.700"
              fontWeight="semibold"
              textAlign="center"
            >
              Odwiedź nasz profil na platformie Instagram @woof_put
              <br />
              lub Facebook @WOOF by Enactus PUT!
              <br />
              Jesteśmy również aktywni na LinkedIn jako @enactus-put
            </Card.Description>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
