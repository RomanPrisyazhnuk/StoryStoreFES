import ApiClient from './ApiClient';
import Authentications from './Authentications';
import Games from './Games';
import Likes from './Likes';
import Registrations from './Registrations';

export default function ({ apiPrefix } = {}) {
    const api = new ApiClient({ prefix: apiPrefix});
    return {
        authentications: new Authentications({apiClient: api}),
        games: new Games({apiClient: api}),
        likes: new Likes({apiClient: api}),
        registrations: new Registrations({apiClient: api})
    };
}
