var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// a. Classe Usuario
var Usuario = /** @class */ (function () {
    function Usuario(id, email, apelido, documento) {
        this.id = id;
        this.email = email;
        this.apelido = apelido;
        this.documento = documento;
    }
    // Métodos de leitura (getters)
    Usuario.prototype.getId = function () {
        return this.id;
    };
    Usuario.prototype.getEmail = function () {
        return this.email;
    };
    Usuario.prototype.getApelido = function () {
        return this.apelido;
    };
    Usuario.prototype.getDocumento = function () {
        return this.documento;
    };
    return Usuario;
}());
// b. Classe Publicacao
var Publicacao = /** @class */ (function () {
    function Publicacao(id, usuario, conteudo, dataHora) {
        this.id = id;
        this.usuario = usuario;
        this.conteudo = conteudo;
        this.dataHora = dataHora;
    }
    // Métodos de leitura (getters)
    Publicacao.prototype.getId = function () {
        return this.id;
    };
    Publicacao.prototype.getUsuario = function () {
        return this.usuario;
    };
    Publicacao.prototype.getConteudo = function () {
        return this.conteudo;
    };
    Publicacao.prototype.getDataHora = function () {
        return this.dataHora;
    };
    return Publicacao;
}());
// c. Tipo enumerado TipoInteracao
var TipoInteracao;
(function (TipoInteracao) {
    TipoInteracao["Curtir"] = "curtir";
    TipoInteracao["NaoCurtir"] = "n\u00E3o curtir";
    TipoInteracao["Riso"] = "riso";
    TipoInteracao["Surpresa"] = "surpresa";
    TipoInteracao["Raiva"] = "raiva";
})(TipoInteracao || (TipoInteracao = {}));
// d. Classe Interacao
var Interacao = /** @class */ (function () {
    function Interacao(id, publicacao, tipoInteracao, usuario, dataHora) {
        this.id = id;
        this.publicacao = publicacao;
        this.tipoInteracao = tipoInteracao;
        this.usuario = usuario;
        this.dataHora = dataHora;
    }
    // Métodos de leitura (getters)
    Interacao.prototype.getId = function () {
        return this.id;
    };
    Interacao.prototype.getPublicacao = function () {
        return this.publicacao;
    };
    Interacao.prototype.getTipoInteracao = function () {
        return this.tipoInteracao;
    };
    Interacao.prototype.getUsuario = function () {
        return this.usuario;
    };
    Interacao.prototype.getDataHora = function () {
        return this.dataHora;
    };
    return Interacao;
}());
// e. Classe PublicacaoAvancada (herda de Publicacao)
var PublicacaoAvancada = /** @class */ (function (_super) {
    __extends(PublicacaoAvancada, _super);
    function PublicacaoAvancada(id, usuario, conteudo, dataHora) {
        var _this = _super.call(this, id, usuario, conteudo, dataHora) || this;
        _this.interacoes = [];
        return _this;
    }
    // Adicionar interação
    PublicacaoAvancada.prototype.adicionarInteracao = function (interacao) {
        this.interacoes.push(interacao);
    };
    // Método para obter todas as interações
    PublicacaoAvancada.prototype.getInteracoes = function () {
        return this.interacoes;
    };
    return PublicacaoAvancada;
}(Publicacao));
// Exemplo de uso:
var usuario1 = new Usuario(1, "usuario1@example.com", "user1", "123456789");
var publicacaoSimples = new Publicacao(1, usuario1, "Primeira publicação", new Date());
var publicacaoAvancada = new PublicacaoAvancada(2, usuario1, "Publicação avançada", new Date());
var interacao1 = new Interacao(1, publicacaoAvancada, TipoInteracao.Curtir, usuario1, new Date());
publicacaoAvancada.adicionarInteracao(interacao1);
console.log(publicacaoAvancada.getInteracoes());
// Exceções customizadas
var UsuarioExistenteError = /** @class */ (function (_super) {
    __extends(UsuarioExistenteError, _super);
    function UsuarioExistenteError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "UsuarioExistenteError";
        return _this;
    }
    return UsuarioExistenteError;
}(Error));
var PublicacaoExistenteError = /** @class */ (function (_super) {
    __extends(PublicacaoExistenteError, _super);
    function PublicacaoExistenteError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "PublicacaoExistenteError";
        return _this;
    }
    return PublicacaoExistenteError;
}(Error));
var InteracaoExistenteError = /** @class */ (function (_super) {
    __extends(InteracaoExistenteError, _super);
    function InteracaoExistenteError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "InteracaoExistenteError";
        return _this;
    }
    return InteracaoExistenteError;
}(Error));
// Classe RedeSocial
var RedeSocial = /** @class */ (function () {
    function RedeSocial() {
        this.usuarios = [];
        this.publicacoes = [];
    }
    // a. Método para incluir usuário com validação de ID e e-mail
    RedeSocial.prototype.adicionarUsuario = function (usuario) {
        var usuarioExistente = this.usuarios.find(function (u) { return u.getId() === usuario.getId() || u.getEmail() === usuario.getEmail(); });
        if (usuarioExistente) {
            throw new UsuarioExistenteError("Usuário com o mesmo ID ou e-mail já existe.");
        }
        this.usuarios.push(usuario);
    };
    // Método para consultar usuário por e-mail
    RedeSocial.prototype.consultarUsuario = function (email) {
        return this.usuarios.find(function (u) { return u.getEmail() === email; });
    };
    // a. Método para incluir publicação com validação de ID
    RedeSocial.prototype.adicionarPublicacao = function (publicacao) {
        var publicacaoExistente = this.publicacoes.find(function (p) { return p.getId() === publicacao.getId(); });
        if (publicacaoExistente) {
            throw new PublicacaoExistenteError("Publicação com o mesmo ID já existe.");
        }
        this.publicacoes.push(publicacao);
    };
    // b. Listar todas as publicações em ordem decrescente por data de criação (feed)
    RedeSocial.prototype.listarPublicacoes = function () {
        var publicacoesOrdenadas = this.publicacoes.sort(function (a, b) { return b.getDataHora().getTime() - a.getDataHora().getTime(); });
        publicacoesOrdenadas.forEach(function (pub) {
            console.log("ID: ".concat(pub.getId(), ", Usu\u00E1rio: ").concat(pub.getUsuario().getApelido(), ", Data: ").concat(pub.getDataHora(), ", Conte\u00FAdo: ").concat(pub.getConteudo()));
            if (pub instanceof PublicacaoAvancada) {
                console.log("Rea\u00E7\u00F5es: ".concat(pub.getInteracoes().length));
            }
        });
    };
    // d. Método para listar publicações de um usuário específico
    RedeSocial.prototype.listarPublicacoesPorUsuario = function (email) {
        var usuario = this.consultarUsuario(email);
        if (!usuario) {
            console.log("Usuário não encontrado.");
            return;
        }
        var publicacoesDoUsuario = this.publicacoes.filter(function (p) { return p.getUsuario().getEmail() === email; });
        var publicacoesOrdenadas = publicacoesDoUsuario.sort(function (a, b) { return b.getDataHora().getTime() - a.getDataHora().getTime(); });
        publicacoesOrdenadas.forEach(function (pub) {
            console.log("ID: ".concat(pub.getId(), ", Data: ").concat(pub.getDataHora(), ", Conte\u00FAdo: ").concat(pub.getConteudo()));
        });
    };
    // e. Método para reagir a uma PublicacaoAvancada com validação
    RedeSocial.prototype.reagirPublicacaoAvancada = function (publicacaoId, tipoInteracao, usuario) {
        var publicacao = this.publicacoes.find(function (p) { return p.getId() === publicacaoId; });
        if (!publicacao || !(publicacao instanceof PublicacaoAvancada)) {
            console.log("Publicação avançada não encontrada.");
            return;
        }
        // Verifica se o usuário já interagiu com a publicação
        var interacaoExistente = publicacao.getInteracoes().find(function (i) { return i.getUsuario().getId() === usuario.getId(); });
        if (interacaoExistente) {
            throw new InteracaoExistenteError("Usuário já interagiu com esta publicação.");
        }
        // Adiciona a interação
        var novaInteracao = new Interacao(Date.now(), publicacao, tipoInteracao, usuario, new Date());
        publicacao.adicionarInteracao(novaInteracao);
        console.log("Interação adicionada com sucesso.");
    };
    return RedeSocial;
}());
// Exemplo de uso:
var redeSocial = new RedeSocial();
try {
    var usuario1_1 = new Usuario(1, "usuario1@example.com", "user1", "123456789");
    redeSocial.adicionarUsuario(usuario1_1);
    var publicacao1 = new Publicacao(1, usuario1_1, "Minha primeira publicação", new Date());
    redeSocial.adicionarPublicacao(publicacao1);
    var publicacaoAvancada_1 = new PublicacaoAvancada(2, usuario1_1, "Minha publicação avançada", new Date());
    redeSocial.adicionarPublicacao(publicacaoAvancada_1);
    // Listar publicações (feed)
    console.log("Feed de publicações:");
    redeSocial.listarPublicacoes();
    // Listar publicações de um usuário específico
    console.log("Publicações do usuário 'user1':");
    redeSocial.listarPublicacoesPorUsuario("usuario1@example.com");
    // Adicionar interação a uma publicação avançada
    redeSocial.reagirPublicacaoAvancada(2, TipoInteracao.Curtir, usuario1_1);
    redeSocial.reagirPublicacaoAvancada(2, TipoInteracao.Riso, usuario1_1); // Deve gerar exceção
}
catch (error) {
    console.error(error.message);
}
