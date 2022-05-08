// useCase
class CheckLastEventStatus {
  constructor (private readonly loadLastEventRepository: LoadLastEventRepository) {}
  async perform (groupId: string): Promise<void> {
    this.loadLastEventRepository.groupId = groupId;
  }
}

class LoadLastEventRepository {
  groupId?: string;
}

describe('CheckLastEventStatus', () => {
  it('should get last event data', async () => {
    const loadLastEventRepository = new LoadLastEventRepository();
    const checkLastEventStatus = new CheckLastEventStatus(loadLastEventRepository);

    await checkLastEventStatus.perform('any_group_id');

    expect(loadLastEventRepository.groupId).toBe('any_group_id');
  });
});