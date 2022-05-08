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

  async loadLastEvent (groupId: string): Promise<void> {
    // quando eu faço essa atribuição eu consigo fazer uma comparação no teste
    this.groupId = groupId
  }
}

describe('CheckLastEventStatus', () => {
  it('should get last event data', async () => {
    const loadLastEventRepository = new LoadLastEventRepositoryMock();
    const checkLastEventStatus = new CheckLastEventStatus(loadLastEventRepository);

    await checkLastEventStatus.perform('any_group_id');

    expect(loadLastEventRepository.groupId).toBe('any_group_id');
  });
});