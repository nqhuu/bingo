const getAllBingoService = () => {
    return fetch('http://localhost:4000/number')
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export { getAllBingoService };