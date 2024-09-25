// Exporta uma função chamada httpHelper que cria um objeto com funções para requisições HTTP
export const httpHelper = () => {
    // Função customFetch para lidar com requisições HTTP usando fetch
    const customFetch = async (url, options = {}) => {
        // Define o método padrão como "GET" caso não seja especificado nas opções
        const defaultMethod = "GET";

        // Define os cabeçalhos padrão para as requisições HTTP, indicando que o conteúdo é JSON
        const defaultHeaders = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        // Cria um AbortController para permitir o cancelamento da requisição se necessário
        const controller = new AbortController();

        // Atribui o sinal de abortamento ao objeto de opções da requisição
        options.signal = controller.signal;

        // Define o método da requisição, usando o método padrão caso não seja fornecido
        options.method = options.method || defaultMethod;

        // Combina os cabeçalhos fornecidos nas opções com os cabeçalhos padrão
        options.headers = options.headers
            ? { ...defaultHeaders, ...options.headers } // Se houver cabeçalhos, combina com os padrões
            : defaultHeaders; // Caso contrário, usa apenas os cabeçalhos padrão

        // Converte o corpo da requisição para JSON, se existir
        options.body = JSON.stringify(options.body) || false;
        if (!options.body) delete options.body; // Se não houver corpo, remove a propriedade body

        // Define um tempo limite de 3 segundos para a requisição, após o qual ela será abortada
        setTimeout(() => {
            controller.abort();
        }, 3000);

        try {
            // Tenta fazer a requisição usando fetch com a URL e opções fornecidas
            const response = await fetch(url, options);

            // Retorna a resposta como JSON
            return await response.json();
        } catch (err) {
            // Em caso de erro (ex.: requisição abortada ou falha de rede), retorna o erro
            return err;
        }
    };

    // Função para requisições GET, simplesmente chama o customFetch com o método padrão GET
    const get = (url, options = {}) => customFetch(url, options);

    // Função para requisições POST, define o método como POST e chama o customFetch
    const post = (url, options) => {
        options.method = "POST";
        return customFetch(url, options);
    };

    // Função para requisições PUT, define o método como PUT e chama o customFetch
    const put = (url, options) => {
        options.method = "PUT";
        return customFetch(url, options);
    };

    // Função para requisições DELETE, define o método como DELETE e chama o customFetch
    const del = (url, options) => {
        options.method = "DELETE";
        return customFetch(url, options);
    };

    // Retorna um objeto que contém as funções get, post, put e del, que podem ser usadas para fazer requisições HTTP
    return {
        get,
        post,
        put,
        del,
    };
};
