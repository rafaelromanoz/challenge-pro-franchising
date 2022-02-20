import { mockIngredient, mockIngredientOther } from "./mockData";
import sinon from 'sinon';
import { expect } from "chai";
import ingredientService from "../../services/ingredientsService";
import { getConnection } from "./mongoConnectionMock";
import { MongoClient } from "mongodb";

describe("Testando a camada service dos ingredients", () => {
  let connectionMock: MongoClient;
  beforeAll(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });
  afterAll(async() => {
    await connectionMock.db("challenge_pro_franchising").collection("ingredients").deleteMany({});
  })
  describe("Testando função de criar mensagem de erro", () => {
    it("Verifica se retora um objeto com a propriedade statusCode", () => {
      const message = ingredientService.createErrorMessage(400, "Teste");
      expect(message).to.be.an("object").with.property("statusCode");
    });
  });
  describe("Teste se a função de verificar ingrediente", () => {
    it("Verifica se não encontrar nenhum ingrediente lança um erro", async () => {
      try {
        await ingredientService.verifyDontExistsIngredient(null);
      } catch (error) {
        expect(error).to.be.an("object")
      }
    });
    it("Verifica se não encontrar joga um erro", async () => {
      const response = await ingredientService.verifyDontExistsIngredient(mockIngredient);
      expect(response).to.be.an('undefined');
    });
  });
  describe("Teste se a função de verificar ingrediente", () => {
    it("Verifica se encontrar um  ingrediente retorna o próprio ingrediente", async () => {
      const response = await ingredientService.verifyExistsIngredient(null);
      expect(response).to.be.an('undefined');
    });
    it("Verifica se encontrar joga um erro", async () => {
      try {
        await ingredientService.verifyExistsIngredient(mockIngredient);
      } catch (error) {
        expect(error).to.be.deep.equal({
          message: "Ingredient already exists",
          statusCode: 400
        });
      }
    });
  });
  describe("Testando cadastro de ingrediente", () => {
    it("Verifica se é cadastrado corretamente", async () => {
      const result = await ingredientService.registerIngredientService(mockIngredient);
      expect(result).to.be.deep.equal(mockIngredient);
    });
    it("Verifica se não é possível cadastrar um produto repetido", async () => {
      const result = await ingredientService.registerIngredientService(mockIngredientOther);
      expect(result).to.be.deep.equal(mockIngredientOther);
    });
  });
});
