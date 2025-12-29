### Principais Comandos do Prisma

- npx prisma migrate dev --name <migration-name>: Cria uma migration após ser feita uma alteração no arquivo schema.prisma

- npx prisma migrate reset: Reseta o banco de dados, e re-aplica todas as migrations

- npx prisma db pull: Replica o schema.prisma no banco de dados (não recomendado)
