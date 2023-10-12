class FinancialCalculator extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: 'open' });
  
      this.shadowRoot.innerHTML = `
        <style>
          .calculator{
            width: 650px;
            display: flex;
            padding: 10px 20px 30px 20px;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            border-radius: 10px;
          }
          .results{
            padding: 15px;
            margin-left: 50px;
          }

          #monthly-payment{
            margin:10px 0px;
          }

          #total-amount{
            margin:10px 0px;
          }

          button:hover{
            background-color: #3C3C3C;
            color: #EEEEEE;
          }
        </style>
        <div class="calculator">
          <form>
            <!-- Поля для ввода данных -->
            <label for="loan-amount"><h3>Сумма кредита:</h3></label>
            <input id="loan-amount" type="number" step="any" required>
    
            <label for="interest-rate"><h3>Процентная ставка:</h3></label>
            <input id="interest-rate" type="number" step="any" required>
    
            <label for="loan-term"><h3>Срок кредита в месяцах:</h3></label>
            <input id="loan-term" type="number" step="any" required>
    
            <!-- Кнопка для расчета -->
            <button type="submit">Рассчитать</button>
          </form>
    
          <div class="results">
            <!-- Поля для вывода результатов -->
            <div id="monthly-payment">Ежемесячный платеж: $0</div>
            <div id="total-amount">Общая сумма: $0</div>
            <div id="total-interest">Общий процент: 0%</div>
          </div>
        </div>
      `;
    }
  
    connectedCallback() {
      console.log('Компонент создан');
      
      this.shadowRoot.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();
        this.calculate();
      });
    }
  
    disconnectedCallback() {
      console.log('Компонент удален');
    }
  
    attributeChangedCallback() {
      console.log('Данные обновлены');
    }
  
    static get observedAttributes() {
      return ['loan-amount', 'interest-rate', 'loan-term'];
    }
  
    calculate() {
      const loanAmount = this.shadowRoot.querySelector('#loan-amount').value;
      const interestRate = this.shadowRoot.querySelector('#interest-rate').value;
      const loanTerm = this.shadowRoot.querySelector('#loan-term').value;
  
      if (!loanAmount || !interestRate || !loanTerm) {
        console.log('Введите все данные');
        return;
      }
  
      const monthlyPayment = loanAmount * (interestRate / 12) * Math.pow(1 + (interestRate / 12), loanTerm) / (Math.pow(1 + (interestRate / 12), loanTerm) - 1);
      const totalAmount = monthlyPayment * loanTerm;
      const totalInterest = totalAmount - loanAmount;
  
      this.shadowRoot.querySelector('#monthly-payment').textContent = `Ежемесячный платеж: $${monthlyPayment}`;
      this.shadowRoot.querySelector('#total-amount').textContent = `Общая сумма: $${totalAmount}`;
      this.shadowRoot.querySelector('#total-interest').textContent = `Общий процент: ${totalInterest}%`;
    }
  }
  
  customElements.define('financial-calculator', FinancialCalculator);
