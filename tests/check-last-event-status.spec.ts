import { set, reset } from 'mockdate';

// entidade
class EventStatus {
  status : 'active' | 'inReview' | 'done';

  // movendo a lógica da regra de nogócio para a entidade
  constructor (event?: { endDate: Date, reviewDurationInHours: number }) {
    // regra de negócio
    if (event === undefined) {
      this.status = 'done';
      return;
    }
    const now = new Date();
    if (event.endDate >= now) {
      this.status = 'active';
      return;
    }
    const reviewDurationInMs = event.reviewDurationInHours * 60 * 60 * 1000;
    const reviewDate = new Date(event.endDate.getTime() + reviewDurationInMs);
    this.status = reviewDate >= now ? 'inReview' : 'done';
  }
}

// useCase
class CheckLastEventStatus {
  constructor (private readonly loadLastEventRepository: LoadLastEventRepository) {}

  async perform ({ groupId }: { groupId: string }): Promise<EventStatus> {
    const event = await this.loadLastEventRepository.loadLastEvent({ groupId });
    return new EventStatus(event);
  }
}

// interface é para definir um contrato
interface LoadLastEventRepository {
  loadLastEvent: (input: { groupId: string }) => Promise<{ endDate: Date, reviewDurationInHours: number } | undefined>;
}

// Mock é um duble de teste que está precupado com o input, precupado em só ter
// variáveis auciliares para poder fazer comparações, só com o input
// o Spy eu me precupo tanto com o input quanto o output
class LoadLastEventRepositorySpy implements LoadLastEventRepository {
  groupId?: string;
  callsCount = 0;
  output?: { endDate: Date, reviewDurationInHours: number };

  async loadLastEvent ({ groupId }: { groupId: string }): Promise<{ endDate: Date, reviewDurationInHours: number } |undefined> {
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

    const eventStatus = await sut.perform({ groupId });

    expect(eventStatus.status).toBe('done');
  });

  it('should return status active when now is before event end time', async () => {
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = {
      // getTime retorna a quantidade de milissegundos de uma data
      endDate: new Date(new Date().getTime() + 1),
      reviewDurationInHours: 1
    };

    const eventStatus = await sut.perform({ groupId });

    expect(eventStatus.status).toBe('active');
  });

  it('should return status active when now is equal to event end time', async () => {
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = {
      endDate: new Date(),
      reviewDurationInHours: 1
    }

    const eventStatus = await sut.perform({ groupId });

    expect(eventStatus.status).toBe('active');
  });

  it('should return status inReview when now is after event end time', async () => {
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = {
      // getTime retorna a quantidade de milissegundos de uma data
      endDate: new Date(new Date().getTime() - 1),
      reviewDurationInHours: 1
    };

    const eventStatus = await sut.perform({ groupId });

    expect(eventStatus.status).toBe('inReview');
  });

  it('should return status inReview when now is before review time', async () => {
    const reviewDurationInHours = 1;
    const reviewDurationInMs = reviewDurationInHours * 60 * 60 * 1000;
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = {
      // getTime retorna a quantidade de milissegundos de uma data
      endDate: new Date(new Date().getTime() - reviewDurationInMs + 1),
      reviewDurationInHours
    };

    const eventStatus = await sut.perform({ groupId });

    expect(eventStatus.status).toBe('inReview');
  });

  it('should return status inReview when now equal to review time', async () => {
    const reviewDurationInHours = 1;
    const reviewDurationInMs = reviewDurationInHours * 60 * 60 * 1000;
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = {
      // getTime retorna a quantidade de milissegundos de uma data
      endDate: new Date(new Date().getTime() - reviewDurationInMs),
      reviewDurationInHours
    };

    const eventStatus = await sut.perform({ groupId });

    expect(eventStatus.status).toBe('inReview');
  });

  it('should return status done when now is after to review time', async () => {
    const reviewDurationInHours = 1;
    const reviewDurationInMs = reviewDurationInHours * 60 * 60 * 1000;
    const { sut, loadLastEventRepository } = makeSut();
    loadLastEventRepository.output = {
      // getTime retorna a quantidade de milissegundos de uma data
      endDate: new Date(new Date().getTime() - reviewDurationInMs - 1),
      reviewDurationInHours
    };

    const eventStatus = await sut.perform({ groupId });

    expect(eventStatus.status).toBe('done');
  });
});