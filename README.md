# Webapps-2021-gruppe-16

## Oppgaveoversikt
### OPPGAVE 1 HELPDESK MAPPE:
gå til mappen helpdesk ved å åpne terminalen og skriv inn følgende kommand: 
1) cd helpdesk
2) npm i / yarn install
3) npx prisma migrate / yarn prisma:migrate
4) npx prisma seed / yarn prisma:seed
5) npm run start

( kan resette databasen via API på path /api/reset )

Koden vil kjøre og dere vil få opp en liste med henvendelser.

### OPPGAVE 2 CHRISTMAS MAPPE 
1) cd christmas
2) npm i / yarn install
3) npx prisma migrate / yarn prisma:migrate
4) npx prisma seed / yarn prisma:seed
5) npm run dev

### OPPGAVE 2 CHRISTMAS MAPPE 
1) cd master_mind
2) npm i / yarn install
3) npx prisma migrate / yarn prisma:migrate
4) npx prisma seed / yarn prisma:seed
5) npm run dev

### OPPGAVE 4 TESTING MAPPE 
1) cd testing
2) npm i / yarn install
3) yarn test
4) velg "a"

Nå burde du kunne se testene i Terminalen.


## Hvis det er problemer med API / Databasen
Vi opplever at det iblant kan kan oppstå krøll. Da kan man prøve følgende:
1. Slett dev.db i prisma folderen
2. Slett migrations folderen
3. I terminalen kjør
  - yarn prisma:migrate init
  - yarn prisma:seed
  - yarn dev


## Problemer med Oppgaven: 
Kom ikke så langt til å få tilkoblet alt av frontend med eksisterende backend funksjoner.
Derfor vil koden som genereres når du klikker på en open slot returnere i consolen en userSlot med data og unik kode.
Dersom slotten ikke er åpen vil consolen returnere at slotten er ikke åpen ennå. 

