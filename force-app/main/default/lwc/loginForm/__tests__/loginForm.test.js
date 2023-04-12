import { createElement } from 'lwc';
import LoginForm from 'c/loginForm';

async function flushPromises(){

    return Promise.resolve();
}
describe('c-login-form', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    beforeEach(() => {

        const element = createElement('c-login-form')
            is: LoginForm
        });
        document.body.appendChild(element);
    })

    it('Check login', async () => {
      
        const element = document.body.querySelector('c-login-form');
        const inputs = element.shadowRoot.querySelectorAll('lightning-input');
        inputs[0].value = 'Samir@persi.com';
        inputs[0].dispatchEvent(new CustomEvent('change',{
            detail:{value: inputs[0].value}
        }));
        inputs[1].value = 'sam@2023';
        inputs[1].dispatchEvent(new CustomEvent('change'));

        const loginButton = element.shadowRoot.querySelector('lightning-button');
        loginButton.click();
        const h3 = element.shadowRoot.querySelector('h3');
        await flushPromises();
        expect(h3.textContent).toBe('Logged in as Samir@persi.com');
       
    });
    
    
    it('Check error through without email login', async () => {
      
        const element = document.body.querySelector('c-login-form');
        const inputs = element.shadowRoot.querySelectorAll('lightning-input');
       
        inputs[1].value = 'sam@2023';
        inputs[1].dispatchEvent(new CustomEvent('change'));
        const loginButton = element.shadowRoot.querySelector('lightning-button');
        loginButton.click();
        const h3 = element.shadowRoot.querySelector('h3');
        await flushPromises();
        expect(h3.textContent).toBe('Please enter email');
       
    });
    it('Check error through without password login', async () => {
      
        const element = document.body.querySelector('c-login-form');
        const inputs = element.shadowRoot.querySelectorAll('lightning-input');
        // Email Input
        inputs[0].value = 'asif_jamal@ps.com';
        inputs[0].dispatchEvent(new CustomEvent('change',{
            detail:{value: inputs[0].value}
        }));

        const loginButton = element.shadowRoot.querySelector('lightning-button');
        loginButton.click();
        const h3 = element.shadowRoot.querySelector('h3');
        await flushPromises();
        expect(h3.textContent).toBe('Error: Password not entered');
       
    });
    it('Check reset password', async () => {
      
        const element = document.body.querySelector('c-login-form');
       
        const forgetPasswordButton = element.shadowRoot.querySelector('a');
        forgetPasswordButton.click();
        const h3 = element.shadowRoot.querySelector('h3');
        await flushPromises();
        expect(h3.textContent).toBe('Password successfully reset');
       
    });

