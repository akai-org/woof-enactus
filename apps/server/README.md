# Woof Enactus - Backend
Backend dla aplikacji Woof Enactus

## Wymagania
- Docker + Docker Compose
- Git
- Wersja Node.js >= 20

## Dokumentacja
Dokumentacja dla frontend'u dostępna jest w systemie Swagger. W celu jego uruchomienia trzeba w pierwszej kolejności uruchomić sam backend (patrz sekcja [Instalacja](#instalacja) i [Uruchamianie](#instalacja))

- Swagger: [Link]()
- Kolekcja Postman: [Link]()

## Instalacja
Zainstaluj zależności projektu za pomocą polecenia `npm i` wykonanym w głównym katalogu monorepo.

## Uruchamianie
Za pomocą polecenia `npm run start:dev:db` uruchamia się bazę danych PostgreSQL w kontenerze Dockera oraz system GUI pgAdmin do przeglądania i edycji danych w niej zawartych.

Poleceniem `npm -w server start:dev` uruchamia się backend aplikacji w środowisku development.
Aby backend poprawnie się uruchomił musi być uruchomiana baza danych za pomocą wcześniej opisanego polecenia.

## Development
Trzymać się dobrych praktyk opisanych w dokumentacji Nest'a (np. używanie CLI do generowania templateów). Używać Prettier'a do formatowania kodu. Commity, Issue oraz Pull Requesty opisywać w sposób czytelny/autodokumnentujący się.

### Prisma ORM
Po dodaniu modelu/i do [schematu Prismy](./prisma/schema.prisma) należy wykonać polecenie `npm -w server prisma:generate`. Wygeneruje ono typy oraz definicje klas dla opiektów z bazy. UWAGA! Po genereacji może być konieczne zrestartowanie IDE. ww. polecenie należy również wykonać przy pierwszym uruchomieniu projektu. Wymagane też jest ustawienie pliku [.env](.env) zgodnie z plikiem [.env.example](.env.example).

## Przydatne linki + info
- [Dokumentacja Nest.js](https://docs.nestjs.com/)
- [Dokumentacja Prismy](https://prisma.io/docs)
- [Dokumentacja PostgreSQL'a](https://www.postgresql.org/docs/17/index.html)
- [Dokumentacja pgAdmin'a](https://www.pgadmin.org/docs/pgadmin4/9.0/index.html)
- [Dokumentacja Docker'a](https://docs.docker.com/)

Wszelkie pytania proszę kierować na kanał projektu na Discordzie ([Link](https://discord.com/channels/768494845634412624/1316071454994993193))
