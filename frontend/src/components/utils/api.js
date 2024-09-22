class Api {
    constructor({
                    baseUrl,
                    headers
                }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getColors() {
        return fetch(`${this.baseUrl}/colors`,
            {
                method: 'GET',
                credentials: 'include',
            }
        )
            .then(this._checkResponse);
    }

    getNotes() {
        return fetch(`${this.baseUrl}/notes`,
            {
                method: 'GET',
                credentials: 'include',
            }
        )
            .then(this._checkResponse);
    }

    getLists() {
        return fetch(`${this.baseUrl}/lists`,
            {
                method: 'GET',
                credentials: 'include',
            }
        )
            .then(this._checkResponse);
    }

    getProfileData() {
        return fetch(`${this.baseUrl}/users/me`,
            {
                method: 'GET',
                credentials: 'include',
            }
        )
            .then(this._checkResponse);
    }

    editProfileData(name,
                    email
    ) {
        return fetch(`${this.baseUrl}/users/me`,
            {
                method: 'PATCH',
                headers: this.headers,
                credentials: 'include',
                body: JSON.stringify({
                    name: name,
                    email: email,
                })
            }
        )
            .then(this._checkResponse);
    }

    editNote(noteId,
             note,
             listId,
             content,
             colorId
    ) {
        return fetch(`${this.baseUrl}/notes/${noteId}`,
            {
                method: 'PATCH',
                headers: this.headers,
                credentials: 'include',
                body: JSON.stringify({
                    note: note,
                    list_id: listId,
                    content: content,
                    colorId_id: colorId
                })
            }
        )
            .then(this._checkResponse);
    }

    editList(listId, list) {
        return fetch(`${this.baseUrl}/lists/${listId}`,
            {
                method: 'PATCH',
                headers: this.headers,
                credentials: 'include',
                body: JSON.stringify({
                    list: list,
                })
            }
        )
            .then(this._checkResponse);
    }

    postNewNote() {
        return fetch(`${this.baseUrl}/notes`,
            {
                method: 'POST',
                headers: this.headers,
                credentials: 'include',
            }
        )
            .then(this._checkResponse);
    }

    postNewList(list) {
        return fetch(`${this.baseUrl}/lists`,
            {
                method: 'POST',
                headers: this.headers,
                credentials: 'include',
                body: JSON.stringify({
                    list: list,
                })
            }
        )
            .then(this._checkResponse);
    }

    deleteNote(noteId) {
        return fetch(`${this.baseUrl}/notes/${noteId}`,
            {
                method: 'DELETE',
                headers: this.headers,
                credentials: 'include',
            }
        )
            .then(this._checkResponse);
    }

    deleteList(listId) {
        return fetch(`${this.baseUrl}/lists/${listId}`,
            {
                method: 'DELETE',
                headers: this.headers,
                credentials: 'include',
            }
        )
            .then(this._checkResponse);
    }

    singOut() {
        return fetch(`${this.baseUrl}/signout`,
            {
                method: 'GET',
                credentials: 'include',
            }
        )
            .then(this._checkResponse);
    }

    authorize(email, password) {
        return fetch(`${this.baseUrl}/signin`,
            {
                method: 'POST',
                headers: this.headers,
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                })
            }
        )
            .then(this._checkResponse);
    }

    register(email, password) {
        return fetch(`${this.baseUrl}/signup`,
            {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    email,
                    password
                })
            }
        )
            .then(this._checkResponse);
    }

    checkToken() {
        return fetch(`${this.baseUrl}/users/me`,
            {
                method: 'GET',
                credentials: 'include',
                headers: this.headers,
            }
        )
            .then(this._checkResponse);
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;