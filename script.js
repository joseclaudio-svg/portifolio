document.addEventListener('DOMContentLoaded', () => {
    const quantityInputs = document.querySelectorAll('.item-quantity');
    const serviceCheck = document.getElementById('include-service');

    // Adiciona um 'ouvinte' para qualquer mudança nas quantidades ou no checkbox de serviço
    quantityInputs.forEach(input => input.addEventListener('change', calculateTotal));
    serviceCheck.addEventListener('change', calculateTotal);

    async function calculateTotal() {
        const order = {};
        quantityInputs.forEach(input => {
            const quantity = parseInt(input.value, 10);
            if (quantity > 0) {
                order[input.name] = quantity;
            }
        });

        const includeService = serviceCheck.checked;

        // Envia os dados do pedido para o servidor Flask
        try {
            const response = await fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order, include_service: includeService }),
            });

            if (!response.ok) {
                throw new Error('Erro ao calcular o total.');
            }

            const result = await response.json();
            updateSummaryUI(result);

        } catch (error) {
            console.error('Houve um problema com a requisição:', error);
        }
    }

    function updateSummaryUI(data) {
        // Atualiza os valores na tela com a resposta do servidor
        document.getElementById('subtotal-value').textContent = `R$ ${data.subtotal.toFixed(2)}`;
        document.getElementById('discount-value').textContent = `- R$ ${data.discount.toFixed(2)}`;
        document.getElementById('service-charge-value').textContent = `R$ ${data.service_charge.toFixed(2)}`;
        document.getElementById('total-value').textContent = `R$ ${data.total.toFixed(2)}`;
    }
});