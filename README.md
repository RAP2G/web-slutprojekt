# web-slutprojekt

För att programmet ska fungera man behöver ha Docker nerladdat. 

Länk för windows nerladdning finns [här](https://www.docker.com/products/docker-desktop/)

Efter man har laddat ner projektet ska man skriva följande kommandot i terminalen i båda root mappen och server mappen:

```cmd

cp .env.schema .env
```

## Start Backend

**Se till att Docker Desktop är igång!**

I root mappen skriv 

```cmd
docker-compose up
```

## Start Frontend

I en ny terminal skriv:

```cmd
    cd frontend/
    npm i
    npm run dev
```

Efter det trick på localhost länken i teminalen eller sök på "localhost:8080"