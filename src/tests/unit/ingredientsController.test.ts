import sinon from 'sinon';
import { mockIngredient } from '../unit/mockData';
import { NextFunction } from 'express';
import { expect } from 'chai';
import mocks from 'node-mocks-http';
import ingredientsController from '../../controllers/ingredientController';
import { getConnection } from './mongoConnectionMock';
import { MongoClient } from 'mongodb';

describe("Ao chamar controller de registrar ingrediente", () => {
  let connectionMock: MongoClient;
  beforeAll(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });
  afterAll(async () => {
    await connectionMock.db("challenge_pro_franchising").collection("ingredients").deleteMany({});
  })
  describe("Se retorna o json correto ao cadastrar um ingrediente", () => {
    it("Retorna o json de ingredientes", async () => {
      const NextFunction: NextFunction = jest.fn();
      const response = mocks.createResponse({ locals: mockIngredient });
      const request = mocks.createRequest({ body: mockIngredient })
      const result = await ingredientsController.registerIngredientController(request, response, NextFunction);
      expect(result?.locals).to.be.deep.equal({ ...mockIngredient })
    });
    it("Se retorna o status code incorreto ao passar informações erradas", async () => {
      const NextFunction: NextFunction = jest.fn();
      const response = mocks.createResponse({});
      const request = mocks.createRequest({ body: undefined })
      const result = await ingredientsController.registerIngredientController(request, response, NextFunction);
      expect(result?.statusCode).to.be.deep.equal(undefined)
    });
  });
  describe("Testando update de ingredientes", () => {
    it("Testando se retorna 201", async () => {
      const NextFunction: NextFunction = jest.fn();
      const response = mocks.createResponse({});
      const request = mocks.createRequest({ body: mockIngredient })
      const result = await ingredientsController.updateIngredientController(request, response, NextFunction);
      expect(result?.statusCode).to.be.deep.equal(201)
    })
    it("Se retorna undefined ao passar objeto invalido", async () => {
      const NextFunction: NextFunction = jest.fn();
      const response = mocks.createResponse();
      const request = mocks.createRequest({ body: undefined })
      const result = await ingredientsController.updateIngredientController(request, response, NextFunction);
      expect(result?.statusCode).to.be.deep.equal(undefined);
    })
  })
  describe("Testando deleção de ingrediente", () => {
    it("se retorna 200", async () => {
      const param = 'Requeijão'
      const NextFunction: NextFunction = jest.fn();
      const response = mocks.createResponse();
      const request = mocks.createRequest({
        query: {
        name: param,
      } })
      const result = await ingredientsController.deleteIngredientController(request, response, NextFunction);
      expect(result?.statusCode).to.be.deep.equal(200);
    })
    it("se retorna erro ao passar algo que não exista", async () => {
      const param = 'Teste'
      const NextFunction: NextFunction = jest.fn();
      const response = mocks.createResponse();
      const request = mocks.createRequest({
        query: {
          name: param,
        }
      })
      const result = await ingredientsController.deleteIngredientController(request, response, NextFunction);
      expect(result?.statusCode).to.be.deep.equal(undefined);
    })
  })
  describe("Testando cadastro de quantidade", () => {
    it("se retorna erro ao passar algo que não exista", async () => {
      const NextFunction: NextFunction = jest.fn();
      const response = mocks.createResponse({});
      const request = mocks.createRequest({})
      const result = await ingredientsController.registerIngredientStockController(request, response, NextFunction);
      expect(result?.statusCode).to.be.deep.equal(undefined);
    })
  })
});
