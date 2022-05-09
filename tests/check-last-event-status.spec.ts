// useCase
class CheckLastEventStatus {
  constructor (private readonly loadLastEventRepository: LoadLastEventRepository) {}
  async perform (groupId: string): Promise<string> {
    await this.loadLastEventRepository.loadLastEvent(groupId);
    return 'done';
  }
}

// interface é para definir um contrato
interface LoadLastEventRepository {
  loadLastEvent: (groupId: string) => Promise<undefined>;
}

// Mock é um duble de teste que está precupado com o input, precupado em só ter
// variáveis auciliares para poder fazer comparações, só com o input
// o Spy eu me precupo tanto com o input quanto o output
class LoadLastEventRepositorySpy implements LoadLastEventRepository {
  groupId?: string;
  callsCount = 0;
  output: undefined;

  async loadLastEvent (groupId: string): Promise<undefined> {
    // quando eu faço essa atribuição eu consigo fazer uma comparação no teste
    this.groupId = groupId
    this.callsCount++
    return this.output;
  }
}

describe('CheckLastEventStatus', () => {
  it('should get last event data', async () => {
    const loadLastEventRepository = new LoadLastEventRepositorySpy();
    // sut = System Under Test
    const sut = new CheckLastEventStatus(loadLastEventRepository);

    await sut.perform('any_group_id');

    expect(loadLastEventRepository.groupId).toBe('any_group_id');
    expect(loadLastEventRepository.callsCount).toBe(1);
  });

  it('should return status done when group has no event', async () => {
    const loadLastEventRepository = new LoadLastEventRepositorySpy();
    loadLastEventRepository.output = undefined;
    // sut = System Under Test
    const sut = new CheckLastEventStatus(loadLastEventRepository);

    const status = await sut.perform('any_group_id');

    expect(status).toBe('done');
  });
});