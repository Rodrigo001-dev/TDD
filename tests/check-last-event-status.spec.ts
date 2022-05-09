import { set, reset } from 'mockdate';

// useCase
class CheckLastEventStatus {
  constructor (private readonly loadLastEventRepository: LoadLastEventRepository) {}

  async perform ({ groupId }: { groupId: string }): Promise<string> {
    const event = await this.loadLastEventRepository.loadLastEvent({ groupId });
    if (event === undefined) return 'done';
    const now = new Date();
    return event.endDate > now ? 'active' : 'inReview';
  }
}

// interface é para definir um contrato
interface LoadLastEventRepository {
  loadLastEvent: (input: { groupId: string }) => Promise<{endDate: Date} | undefined>;
}

// Mock é um duble de teste que está precupado com o input, precupado em só ter
// variáveis auciliares para poder fazer comparações, só com o input
// o Spy eu me precupo tanto com o input quanto o output
class LoadLastEventRepositorySpy implements LoadLastEventRepository {
  groupId?: string;
  callsCount = 0;
  output?: { endDate: Date };

  async loadLastEvent ({ groupId }: { groupId: string }): Promise<{endDate: Date} |undefined> {
    // quando eu faço essa atribuição eu consigo fazer uma comparação no teste
    this.groupId = groupId
    this.callsCount++
    return this.output;
  }
}

type SutOutput = { 
  sut: CheckLastEventStatus
  loadLastEventRepository: LoadLastEventRepositorySpy 
}
const makeSut = (): SutOutput => {
  const loadLastEventRepository = new LoadLastEventRepositorySpy();
    // sut = System Under Test
  const sut = new CheckLastEventStatus(loadLastEventRepository);
  return {sut, loadLastEventRepository};
}; 

describe('CheckLastEventStatus', () => {
  const groupId = 'any_group_id';

  beforeAll(() => {
    // congelando a data atual
    set(new Date());
  });

  afterAll(() => {
    reset();
  });
  it('should get last event data', async () => {
    // sut = System Under Test
    const { sut, loadLastEventRepository } = makeSut();

    await sut.perform({ groupId });

    expect(loadLastEventRepository.groupId).toBe(groupId);
    expect(loadLastEventRepository.callsCount).toBe(1);
  });

  it('should return status done when group has no event', async () => {
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = undefined;

    const status = await sut.perform({ groupId });

    expect(status).toBe('done');
  });

  it('should return status active when now is before event end time', async () => {
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = {
      // getTime retorna a quantidade de milissegundos de uma data
      endDate: new Date(new Date().getTime() + 1)
    };

    const status = await sut.perform({ groupId });

    expect(status).toBe('active');
  });

  it('should return status inReview when now is after event end time', async () => {
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = {
      // getTime retorna a quantidade de milissegundos de uma data
      endDate: new Date(new Date().getTime() - 1)
    };

    const status = await sut.perform({ groupId });

    expect(status).toBe('inReview');
  });
});