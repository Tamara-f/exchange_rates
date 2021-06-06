import React, { Component } from 'react';
import axios from 'axios';

const currencyFetchApi = async () => {
  try {
    const { data } = await axios.get(
      `https://www.nbrb.by/api/exrates/rates?periodicity=0`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export default class Home extends Component {
  state = {
    currencies: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    currencyFetchApi()
      .then(currencies => this.setState({ currencies }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }
  render() {
    const { currencies, isLoading, error } = this.state;

    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <p>Loading...</p>}
        {currencies.length > 0 && (
          <>
            <h1>Currencies list</h1>
            <ul className='currenciesList'>
              <div className='currencyListItem CurName'>
                <p>Количество единиц, буквенный код валюты</p>
                <p>Наименование иностранной валюты</p>
                <p>Официальный курс</p>
              </div>
              {currencies.map(currency => (
                <li key={currency.Cur_ID}>
                  <div className='currencyListItem'>
                    <p>
                      {currency.Cur_Scale} {currency.Cur_Abbreviation}
                    </p>
                    <p>{currency.Cur_Name}</p>
                    <p>{currency.Cur_OfficialRate}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}
