import sinon from 'sinon';
import { mockIngredient } from '../unit/mockData';
import { Request, Response, NextFunction } from 'express';
import { expect } from 'chai';
import mocks from 'node-mocks-http';
import ingredientsService from '../../services/ingredientsService';
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
  describe("Se da erro", () => {
    it(" é chamado com algum código", async () => {
      const NextFunction: NextFunction = jest.fn();
      const response = mocks.createResponse({locals: mockIngredient});
      const request = mocks.createRequest({body: mockIngredient})
      await ingredientsController.registerIngredientController(request, response, NextFunction);
      expect(response.statusCode).to.be.equal(201)
    })
  });
});
