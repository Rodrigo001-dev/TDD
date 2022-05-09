# Projeto

Nessa Aplicação fiz testes unitários para praticar todo o fluxo de testes com TDD
Existem 3 tipos de testes:
Testes unitários: testam funcionalidades que não tocam na camada de infra, que não tocam e efeitos colaterais com por exemplo: chamadas API, cadastro no banco de dados, elas nunca tocam em recursos externos.

Testes de integração: são testes que testam funcionalidades que podem realizar chamadas a API, cadastro no banco da dados, funcionalidades que tem efeitos colaterais.

Teste end-to-end: os testes end-to-end ou testes de ponta a ponta é utilizado para testar um fluxo da aplicação desde o começo até o fim, com o intuito de replicar cenários reais feitos pelos usuários com a intenção de validar que as funcionalidades estejam funcionando como o esperado.

<!-- Coisas que deveriamos evitar de colocar no código -->
# Anti-Patterns/Code Smells
- Speculative Generality: começar a supor coisas que você precisa antes de realmente precisar
- God Class: uma class que faz muita coisa
- Divergent Change: se você está em um componente e é necessário mexer nele por mais de um motivo, isso provavelmente é um Anti-Pattern
- Improper Instantiation: criar instâncias de forma errada 
- High Coupling: quando uma classe criar sua propria dependência
- Test Code in Production
- Duplicate Code
- Shotgun Surgery
- Long Parameter List
- Primitive Obsession
- Bad Naming

<!-- Coias boas que deveriamos seguir para colocar no código, coisas que já foram validados por pessaos no passado que já garantiram que é uma forma boa de programar -->
# Design Patterns/Principles/Conventions
- You Ain't Gonna Need It (YAGNI): não faça coisas enquanto você não precisa
- Single Responsibility (SRP): letra S do SOLID
- Liskov Substitution (LSP): letra L do SOLID
- Dependency Inversion (DIP): letra D do SOLID
- Arrange, Act, Assert (AAA): todo teste sempre é criado um bloco onde é ordanizado o teste, depois temos uma ação para se tomar e baseado naquela ação vamos testar alguma coisa
- Dependency Injection (DI): ao invés da minha classe criar as suas proprias dependências, nós recebemos essas dependências de alguém
- Repository Pattern
- Test Doubles (Mock, Stub, Spy)
- Small Commits
- System Under Test (SUT)
- Strategy Pattern
- Factory Pattern
- Clean Code