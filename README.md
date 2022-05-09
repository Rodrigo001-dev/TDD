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