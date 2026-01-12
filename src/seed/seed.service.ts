import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async executeSeed() {
    const data: PokeResponse = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    // const insertPromisesArray: any = [];
    const pokemonInsert: CreatePokemonDto[] = [];

    await this.pokemonModel.deleteMany({});

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');

      const no = Number(segments[segments.length - 2]);

      const pokemonData = { name, no };

      // insertPromisesArray.push(this.pokemonModel.create(pokemonData));
      pokemonInsert.push(pokemonData);
      // const createPokemons = await this.create(pokemonData);

      // return createPokemons;
    });

    await this.createSeed(pokemonInsert as unknown as CreatePokemonDto);

    // await Promise.all(insertPromisesArray);
    return 'Seed executed';
  }

  async createSeed(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.insertMany(createPokemonDto);

      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pokemon - check server logs`,
    );
  }
}
