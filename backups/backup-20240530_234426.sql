--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: estates; Type: TABLE; Schema: public; Owner: dummyuser
--

CREATE TABLE public.estates (
    id integer NOT NULL,
    address character varying(255),
    comments character varying(255)[],
    dep_number integer,
    description character varying(255),
    leasing_price double precision
);


ALTER TABLE public.estates OWNER TO dummyuser;

--
-- Name: estates_id_seq; Type: SEQUENCE; Schema: public; Owner: dummyuser
--

CREATE SEQUENCE public.estates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estates_id_seq OWNER TO dummyuser;

--
-- Name: estates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dummyuser
--

ALTER SEQUENCE public.estates_id_seq OWNED BY public.estates.id;


--
-- Name: finance_transactions; Type: TABLE; Schema: public; Owner: dummyuser
--

CREATE TABLE public.finance_transactions (
    id bigint NOT NULL,
    amount double precision,
    comments character varying(255),
    created_at timestamp(6) without time zone NOT NULL,
    detail character varying(255),
    finance_statement character varying(255),
    month character varying(255),
    updated_at timestamp(6) without time zone NOT NULL,
    year integer,
    user_id uuid
);


ALTER TABLE public.finance_transactions OWNER TO dummyuser;

--
-- Name: finance_transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: dummyuser
--

CREATE SEQUENCE public.finance_transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.finance_transactions_id_seq OWNER TO dummyuser;

--
-- Name: finance_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dummyuser
--

ALTER SEQUENCE public.finance_transactions_id_seq OWNED BY public.finance_transactions.id;


--
-- Name: goals; Type: TABLE; Schema: public; Owner: dummyuser
--

CREATE TABLE public.goals (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    current double precision,
    objective character varying(255),
    target double precision,
    updated_at timestamp(6) without time zone NOT NULL,
    user_id uuid
);


ALTER TABLE public.goals OWNER TO dummyuser;

--
-- Name: goals_id_seq; Type: SEQUENCE; Schema: public; Owner: dummyuser
--

CREATE SEQUENCE public.goals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.goals_id_seq OWNER TO dummyuser;

--
-- Name: goals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dummyuser
--

ALTER SEQUENCE public.goals_id_seq OWNED BY public.goals.id;


--
-- Name: mortgages; Type: TABLE; Schema: public; Owner: dummyuser
--

CREATE TABLE public.mortgages (
    id bigint NOT NULL,
    clp double precision,
    comments character varying(255),
    created_at timestamp(6) without time zone NOT NULL,
    estate character varying(255),
    installment_number integer,
    mgmt_input_id integer,
    month character varying(255),
    uf double precision,
    updated_at timestamp(6) without time zone NOT NULL,
    year integer,
    user_id uuid
);


ALTER TABLE public.mortgages OWNER TO dummyuser;

--
-- Name: mortgages_id_seq; Type: SEQUENCE; Schema: public; Owner: dummyuser
--

CREATE SEQUENCE public.mortgages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mortgages_id_seq OWNER TO dummyuser;

--
-- Name: mortgages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dummyuser
--

ALTER SEQUENCE public.mortgages_id_seq OWNED BY public.mortgages.id;


--
-- Name: real_estate_management; Type: TABLE; Schema: public; Owner: dummyuser
--

CREATE TABLE public.real_estate_management (
    id bigint NOT NULL,
    amount integer,
    comments character varying(255),
    created_at timestamp(6) without time zone NOT NULL,
    detail character varying(255),
    estate character varying(255),
    finance_statement character varying(255),
    is_mortgage boolean DEFAULT false,
    month character varying(255),
    updated_at timestamp(6) without time zone NOT NULL,
    year integer,
    user_id uuid
);


ALTER TABLE public.real_estate_management OWNER TO dummyuser;

--
-- Name: real_estate_management_id_seq; Type: SEQUENCE; Schema: public; Owner: dummyuser
--

CREATE SEQUENCE public.real_estate_management_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.real_estate_management_id_seq OWNER TO dummyuser;

--
-- Name: real_estate_management_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dummyuser
--

ALTER SEQUENCE public.real_estate_management_id_seq OWNED BY public.real_estate_management.id;


--
-- Name: todos; Type: TABLE; Schema: public; Owner: dummyuser
--

CREATE TABLE public.todos (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    description character varying(255),
    is_checked boolean,
    type character varying(255),
    updated_at timestamp(6) without time zone NOT NULL,
    user_id uuid
);


ALTER TABLE public.todos OWNER TO dummyuser;

--
-- Name: todos_id_seq; Type: SEQUENCE; Schema: public; Owner: dummyuser
--

CREATE SEQUENCE public.todos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.todos_id_seq OWNER TO dummyuser;

--
-- Name: todos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dummyuser
--

ALTER SEQUENCE public.todos_id_seq OWNED BY public.todos.id;


--
-- Name: token; Type: TABLE; Schema: public; Owner: dummyuser
--

CREATE TABLE public.token (
    id integer NOT NULL,
    expired boolean NOT NULL,
    revoked boolean NOT NULL,
    token character varying(255),
    token_type character varying(255),
    user_id uuid,
    CONSTRAINT token_token_type_check CHECK (((token_type)::text = 'BEARER'::text))
);


ALTER TABLE public.token OWNER TO dummyuser;

--
-- Name: token_seq; Type: SEQUENCE; Schema: public; Owner: dummyuser
--

CREATE SEQUENCE public.token_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.token_seq OWNER TO dummyuser;

--
-- Name: users; Type: TABLE; Schema: public; Owner: dummyuser
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    email character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    password character varying(255),
    role character varying(255),
    updated_at timestamp(6) without time zone NOT NULL,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['USER'::character varying, 'ADMIN'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO dummyuser;

--
-- Name: estates id; Type: DEFAULT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.estates ALTER COLUMN id SET DEFAULT nextval('public.estates_id_seq'::regclass);


--
-- Name: finance_transactions id; Type: DEFAULT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.finance_transactions ALTER COLUMN id SET DEFAULT nextval('public.finance_transactions_id_seq'::regclass);


--
-- Name: goals id; Type: DEFAULT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.goals ALTER COLUMN id SET DEFAULT nextval('public.goals_id_seq'::regclass);


--
-- Name: mortgages id; Type: DEFAULT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.mortgages ALTER COLUMN id SET DEFAULT nextval('public.mortgages_id_seq'::regclass);


--
-- Name: real_estate_management id; Type: DEFAULT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.real_estate_management ALTER COLUMN id SET DEFAULT nextval('public.real_estate_management_id_seq'::regclass);


--
-- Name: todos id; Type: DEFAULT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.todos ALTER COLUMN id SET DEFAULT nextval('public.todos_id_seq'::regclass);


--
-- Data for Name: estates; Type: TABLE DATA; Schema: public; Owner: dummyuser
--

COPY public.estates (id, address, comments, dep_number, description, leasing_price) FROM stdin;
\.


--
-- Data for Name: finance_transactions; Type: TABLE DATA; Schema: public; Owner: dummyuser
--

COPY public.finance_transactions (id, amount, comments, created_at, detail, finance_statement, month, updated_at, year, user_id) FROM stdin;
\.


--
-- Data for Name: goals; Type: TABLE DATA; Schema: public; Owner: dummyuser
--

COPY public.goals (id, created_at, current, objective, target, updated_at, user_id) FROM stdin;
\.


--
-- Data for Name: mortgages; Type: TABLE DATA; Schema: public; Owner: dummyuser
--

COPY public.mortgages (id, clp, comments, created_at, estate, installment_number, mgmt_input_id, month, uf, updated_at, year, user_id) FROM stdin;
\.


--
-- Data for Name: real_estate_management; Type: TABLE DATA; Schema: public; Owner: dummyuser
--

COPY public.real_estate_management (id, amount, comments, created_at, detail, estate, finance_statement, is_mortgage, month, updated_at, year, user_id) FROM stdin;
\.


--
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: dummyuser
--

COPY public.todos (id, created_at, description, is_checked, type, updated_at, user_id) FROM stdin;
\.


--
-- Data for Name: token; Type: TABLE DATA; Schema: public; Owner: dummyuser
--

COPY public.token (id, expired, revoked, token, token_type, user_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dummyuser
--

COPY public.users (id, created_at, email, first_name, last_name, password, role, updated_at) FROM stdin;
\.


--
-- Name: estates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dummyuser
--

SELECT pg_catalog.setval('public.estates_id_seq', 1, false);


--
-- Name: finance_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dummyuser
--

SELECT pg_catalog.setval('public.finance_transactions_id_seq', 1, false);


--
-- Name: goals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dummyuser
--

SELECT pg_catalog.setval('public.goals_id_seq', 1, false);


--
-- Name: mortgages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dummyuser
--

SELECT pg_catalog.setval('public.mortgages_id_seq', 1, false);


--
-- Name: real_estate_management_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dummyuser
--

SELECT pg_catalog.setval('public.real_estate_management_id_seq', 1, false);


--
-- Name: todos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dummyuser
--

SELECT pg_catalog.setval('public.todos_id_seq', 1, false);


--
-- Name: token_seq; Type: SEQUENCE SET; Schema: public; Owner: dummyuser
--

SELECT pg_catalog.setval('public.token_seq', 1, false);


--
-- Name: estates estates_pkey; Type: CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.estates
    ADD CONSTRAINT estates_pkey PRIMARY KEY (id);


--
-- Name: finance_transactions finance_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.finance_transactions
    ADD CONSTRAINT finance_transactions_pkey PRIMARY KEY (id);


--
-- Name: goals goals_pkey; Type: CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.goals
    ADD CONSTRAINT goals_pkey PRIMARY KEY (id);


--
-- Name: mortgages mortgages_pkey; Type: CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.mortgages
    ADD CONSTRAINT mortgages_pkey PRIMARY KEY (id);


--
-- Name: real_estate_management real_estate_management_pkey; Type: CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.real_estate_management
    ADD CONSTRAINT real_estate_management_pkey PRIMARY KEY (id);


--
-- Name: todos todos_pkey; Type: CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);


--
-- Name: token token_pkey; Type: CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.token
    ADD CONSTRAINT token_pkey PRIMARY KEY (id);


--
-- Name: token uk_pddrhgwxnms2aceeku9s2ewy5; Type: CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.token
    ADD CONSTRAINT uk_pddrhgwxnms2aceeku9s2ewy5 UNIQUE (token);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: todos fk9605g76a1dggbvs18f2r80gvu; Type: FK CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT fk9605g76a1dggbvs18f2r80gvu FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: real_estate_management fk9p2kgp1twrvx8dnlxh74ihmg3; Type: FK CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.real_estate_management
    ADD CONSTRAINT fk9p2kgp1twrvx8dnlxh74ihmg3 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: goals fkb1mp6ulyqkpcw6bc1a2mr7v1g; Type: FK CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.goals
    ADD CONSTRAINT fkb1mp6ulyqkpcw6bc1a2mr7v1g FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: token fkj8rfw4x0wjjyibfqq566j4qng; Type: FK CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.token
    ADD CONSTRAINT fkj8rfw4x0wjjyibfqq566j4qng FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: finance_transactions fkljy6sihrk4x9i177a78mx2pxt; Type: FK CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.finance_transactions
    ADD CONSTRAINT fkljy6sihrk4x9i177a78mx2pxt FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: mortgages fkr50udbs9p7aeuwy0bamvu1yr6; Type: FK CONSTRAINT; Schema: public; Owner: dummyuser
--

ALTER TABLE ONLY public.mortgages
    ADD CONSTRAINT fkr50udbs9p7aeuwy0bamvu1yr6 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

