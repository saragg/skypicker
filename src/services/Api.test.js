import React from 'react';
import Api from './Api';

test('Api gets flights', () => {
  Api.request = jest.fn()

  const params = {
    flyFrom: "Barcelona",
    to: "London",
  }

  Api.getFlights(params)

  expect(Api.request).toBeCalledWith({
    "endpoint": "flights",
    "method": "GET",
    "params":
      {
        "flyFrom": "Barcelona",
        "to": "London"
      }
    }
  );
});

test('Api gets places', () => {
  Api.request = jest.fn()

  const params = {
    term: "Barcelona",
  }

  Api.getPlaces(params)

  expect(Api.request).toBeCalledWith({
    "endpoint": "places",
    "method": "GET",
    "params":
      {"term": "Barcelona", locale: "en"}
    }
  );
});

test('Api urlEncode', () => {
  const params = {
    key1: "value1",
    key2: "value2",
  }

  const result = Api.urlEncode(params)
  expect(result).toBe("key1=value1&key2=value2")
});