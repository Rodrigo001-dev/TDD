// useCase
class CheckLastEventStatus {
  constructor (private readonly loadLastEventRepository: LoadLastEventRepository) {}
  async perform (groupId: string): Promise<void> {
    await this.loadLastEventRepository.loadLastEvent(groupId);
  }
}

// interface é para definir um contrato
interface LoadLastEventRepository {
  loadLastEvent: (groupId: string) => Promise<void>;
}

// Mock é um duble de teste que está precupado com o in put, precupado em só ter
// variáveis auciliares para poder fazer comparações, só com o in put 
class LoadLastEventRepositoryMock implements LoadLastEventRepository {
  groupId?: string;
  callsCount = 0;

  async loadLastEvent (groupId: string): Promise<void> {
    // quando eu faço essa atribuição eu consigo fazer uma comparação no teste
    this.groupId = groupId
    this.callsCount++
  }
}

describe('CheckLastEventStatus', () => {
  it('should get last event data', async () => {
    const loadLastEventRepository = new LoadLastEventRepositoryMock();
    // sut = System Under Test
    const sut = new CheckLastEventStatus(loadLastEventRepository);

    await sut.perform('any_group_id');

    expect(loadLastEventRepository.groupId).toBe('any_group_id');
    expect(loadLastEventRepository.callsCount).toBe(1);
  });
});