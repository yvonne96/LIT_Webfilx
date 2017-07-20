--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS webflix;
--
-- Name: webflix; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE webflix WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United Kingdom.1252' LC_CTYPE = 'English_United Kingdom.1252';


ALTER DATABASE webflix OWNER TO postgres;

\connect webflix

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE account (
    id integer NOT NULL,
    firstname character varying(64),
    lastname character varying(64),
    email_address character varying(256),
    password character varying(128)
);


ALTER TABLE account OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "User_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "User_id_seq" OWNED BY account.id;


--
-- Name: account_movie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE account_movie (
    id integer NOT NULL,
    account_id integer,
    movie_id integer
);


ALTER TABLE account_movie OWNER TO postgres;

--
-- Name: account_movie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE account_movie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE account_movie_id_seq OWNER TO postgres;

--
-- Name: account_movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE account_movie_id_seq OWNED BY account_movie.id;


--
-- Name: account_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE account_role (
    role_id integer,
    account_id integer,
    id integer NOT NULL
);


ALTER TABLE account_role OWNER TO postgres;

--
-- Name: account_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE account_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE account_role_id_seq OWNER TO postgres;

--
-- Name: account_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE account_role_id_seq OWNED BY account_role.id;


--
-- Name: basket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE basket (
    account_id integer,
    id integer NOT NULL
);


ALTER TABLE basket OWNER TO postgres;

--
-- Name: basket_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE basket_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE basket_id_seq OWNER TO postgres;

--
-- Name: basket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE basket_id_seq OWNED BY basket.id;


--
-- Name: basket_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE basket_item (
    id integer NOT NULL,
    movie_id integer,
    basket_id integer
);


ALTER TABLE basket_item OWNER TO postgres;

--
-- Name: basket_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE basket_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE basket_item_id_seq OWNER TO postgres;

--
-- Name: basket_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE basket_item_id_seq OWNED BY basket_item.id;


--
-- Name: basket_voucher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE basket_voucher (
    basket_id integer,
    voucher_id integer
);


ALTER TABLE basket_voucher OWNER TO postgres;

--
-- Name: classification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE classification (
    id integer NOT NULL,
    value character varying(8)
);


ALTER TABLE classification OWNER TO postgres;

--
-- Name: classification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE classification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE classification_id_seq OWNER TO postgres;

--
-- Name: classification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE classification_id_seq OWNED BY classification.id;


--
-- Name: genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE genre (
    id integer NOT NULL,
    value character varying(64)
);


ALTER TABLE genre OWNER TO postgres;

--
-- Name: genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE genre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE genre_id_seq OWNER TO postgres;

--
-- Name: genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE genre_id_seq OWNED BY genre.id;


--
-- Name: movie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE movie (
    id integer NOT NULL,
    title character varying(128),
    year character varying(4),
    genre integer,
    classification integer,
    description text DEFAULT 'Fill me in'::text
);


ALTER TABLE movie OWNER TO postgres;

--
-- Name: movie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE movie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE movie_id_seq OWNER TO postgres;

--
-- Name: movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE movie_id_seq OWNED BY movie.id;


--
-- Name: movie_price; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE movie_price (
    movie_id integer NOT NULL,
    price numeric
);


ALTER TABLE movie_price OWNER TO postgres;

--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE role (
    id integer NOT NULL,
    name character varying(32)
);


ALTER TABLE role OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE role_id_seq OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE role_id_seq OWNED BY role.id;


--
-- Name: voucher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE voucher (
    offer character varying(64),
    name character varying(64),
    id integer NOT NULL
);


ALTER TABLE voucher OWNER TO postgres;

--
-- Name: voucher_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE voucher_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE voucher_id_seq OWNER TO postgres;

--
-- Name: voucher_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE voucher_id_seq OWNED BY voucher.id;


--
-- Name: account id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account ALTER COLUMN id SET DEFAULT nextval('"User_id_seq"'::regclass);


--
-- Name: account_movie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_movie ALTER COLUMN id SET DEFAULT nextval('account_movie_id_seq'::regclass);


--
-- Name: account_role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_role ALTER COLUMN id SET DEFAULT nextval('account_role_id_seq'::regclass);


--
-- Name: basket id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY basket ALTER COLUMN id SET DEFAULT nextval('basket_id_seq'::regclass);


--
-- Name: basket_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY basket_item ALTER COLUMN id SET DEFAULT nextval('basket_item_id_seq'::regclass);


--
-- Name: classification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification ALTER COLUMN id SET DEFAULT nextval('classification_id_seq'::regclass);


--
-- Name: genre id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY genre ALTER COLUMN id SET DEFAULT nextval('genre_id_seq'::regclass);


--
-- Name: movie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY movie ALTER COLUMN id SET DEFAULT nextval('movie_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY role ALTER COLUMN id SET DEFAULT nextval('role_id_seq'::regclass);


--
-- Name: voucher id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY voucher ALTER COLUMN id SET DEFAULT nextval('voucher_id_seq'::regclass);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"User_id_seq"', 23, true);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY account (id, firstname, lastname, email_address, password) FROM stdin;
8	admin	password	eamonn.boyle3@instil.co	425be9b26d17bb9ddde20bf5617a0ae5408ef68c4b3e6d060311c3dec23e9e0430692654b66af568
18	admin	admin	admin	3717e9035ba54fc5a8ca904d7fc06724cc2fde6a6204a98925be587fc229b453150cf9bd173853c8
20	b	g	test"email.com	24d5760d4450d8b78a7bef828c8d9b7b12aeef8bb9da50a1e41ea5614a1953d79b3e584ad75559db
21	asd	asd	asda@sda.co	b446331acfbf0d2f8afa84ec2ccbf620406c7ee25b6fb996a8fd310989ecbe7ebd94f2d2fd125717
22	asd	asd	asd@asd.com	cec4932c2bc861929a3f7c830d56c7366d4a6d0fb85bdf108bb545779da93921248100a011886ba9
23	jake	jake	jake@jake.com	4e54c95234a2ca4ee939956c2d5bcc1cbeae79f42c1800de1e329eae6205dbf9c057900f4c9e6de9
\.


--
-- Data for Name: account_movie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY account_movie (id, account_id, movie_id) FROM stdin;
240	23	9
241	23	10
197	18	6
198	18	10
199	18	6
200	18	6
201	18	6
202	18	6
203	18	6
204	18	6
205	18	9
206	18	7
207	18	6
208	18	11
209	18	11
210	18	9
211	18	10
212	18	11
213	18	11
214	18	11
215	18	10
216	18	11
217	18	6
218	18	7
219	18	10
220	18	10
221	18	11
233	22	11
234	22	9
235	22	8
236	22	6
237	22	7
238	22	10
\.


--
-- Name: account_movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('account_movie_id_seq', 241, true);


--
-- Data for Name: account_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY account_role (role_id, account_id, id) FROM stdin;
1	8	1
1	18	2
2	18	3
1	20	5
1	21	6
1	22	7
1	23	8
\.


--
-- Name: account_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('account_role_id_seq', 8, true);


--
-- Data for Name: basket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY basket (account_id, id) FROM stdin;
18	94
20	67
\.


--
-- Name: basket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('basket_id_seq', 98, true);


--
-- Data for Name: basket_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY basket_item (id, movie_id, basket_id) FROM stdin;
190	11	\N
192	6	\N
194	6	\N
197	7	\N
198	6	\N
199	7	\N
200	6	\N
201	6	\N
202	7	\N
383	11	67
384	11	67
385	11	67
386	11	67
390	11	\N
391	10	\N
392	10	\N
221	11	\N
220	11	\N
219	11	\N
223	10	\N
218	11	\N
216	11	\N
438	11	\N
439	11	\N
411	11	\N
412	11	\N
415	11	\N
418	10	\N
425	9	\N
482	9	94
\.


--
-- Name: basket_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('basket_item_id_seq', 486, true);


--
-- Data for Name: basket_voucher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY basket_voucher (basket_id, voucher_id) FROM stdin;
\.


--
-- Data for Name: classification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY classification (id, value) FROM stdin;
8	U
9	PG
10	PG-13
11	12
12	12A
13	15
14	18
\.


--
-- Name: classification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('classification_id_seq', 14, true);


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY genre (id, value) FROM stdin;
5	Horror
6	Comedy
7	Family
8	Science Fiction
\.


--
-- Name: genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('genre_id_seq', 8, true);


--
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY movie (id, title, year, genre, classification, description) FROM stdin;
11	Eraser	1996	5	14	U.S. Marshal deputy John Kruger is one of the toughest Marshals, his methods are to "Erase" The identities of his witnesses he is assigned to protect.
10	True Lies	1994	5	14	A fearless, globe-trotting, terrorist-battling secret agent has his life turned upside down when he discovers his wife might be having an affair with a used car salesman while terrorists smuggle nuclear war heads into the United States.
9	Total Recall	1990	5	14	Quaid visits Rekall, a unique travel agency that implants the memory of an adventure into its customers' minds, to get the chance to live out his Martian fantasies.
8	Predator	1987	5	14	Dutch and his group of commandos are hired by the CIA to rescue downed airmen from guerillas in a Central American jungle.
7	Commando	1985	5	14	India's most wanted Black Money agent, Vicky Chaddha, gets arrested in Malaysia and is kept in a safe house by the Malaysian authorities, along with his wife.
6	The Terminator  	1984	5	14	A Cyborg has been sent from the future on a deadly mission, it has been programmed to kill a young woman named Sarah Connor.
\.


--
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('movie_id_seq', 11, true);


--
-- Data for Name: movie_price; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY movie_price (movie_id, price) FROM stdin;
6	2.99
7	2.99
8	2.99
9	2.99
10	3.99
11	3.50
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY role (id, name) FROM stdin;
1	USER
2	ADMIN
\.


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('role_id_seq', 5, true);


--
-- Data for Name: voucher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY voucher (offer, name, id) FROM stdin;
BUY 1 GET 1 FREE	SAVEBOGOF	1
\.


--
-- Name: voucher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('voucher_id_seq', 1, true);


--
-- Name: account User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: account account_emailaddress_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_emailaddress_unique UNIQUE (email_address);


--
-- Name: account_movie account_movie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_movie
    ADD CONSTRAINT account_movie_pkey PRIMARY KEY (id);


--
-- Name: account_role account_role_id_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_role
    ADD CONSTRAINT account_role_id_pk PRIMARY KEY (id);


--
-- Name: basket_item basket_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY basket_item
    ADD CONSTRAINT basket_item_pkey PRIMARY KEY (id);


--
-- Name: basket basket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY basket
    ADD CONSTRAINT basket_pkey PRIMARY KEY (id);


--
-- Name: classification classification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification
    ADD CONSTRAINT classification_pkey PRIMARY KEY (id);


--
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (id);


--
-- Name: movie movie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY movie
    ADD CONSTRAINT movie_pkey PRIMARY KEY (id);


--
-- Name: movie_price movie_price_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY movie_price
    ADD CONSTRAINT movie_price_pkey PRIMARY KEY (movie_id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: classification unique_classification_value; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification
    ADD CONSTRAINT unique_classification_value UNIQUE (value);


--
-- Name: genre unique_genre_value; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY genre
    ADD CONSTRAINT unique_genre_value UNIQUE (value);


--
-- Name: voucher voucher_id_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY voucher
    ADD CONSTRAINT voucher_id_pk PRIMARY KEY (id);


--
-- Name: account_role_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX account_role_id_uindex ON account_role USING btree (id);


--
-- Name: role_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX role_id_uindex ON role USING btree (id);


--
-- Name: role_name_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX role_name_uindex ON role USING btree (name);


--
-- Name: voucher_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX voucher_id_uindex ON voucher USING btree (id);


--
-- Name: voucher_name_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX voucher_name_uindex ON voucher USING btree (name);


--
-- Name: account_movie account_movie_account_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_movie
    ADD CONSTRAINT account_movie_account_id_fk FOREIGN KEY (account_id) REFERENCES account(id);


--
-- Name: account_movie account_movie_movie_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_movie
    ADD CONSTRAINT account_movie_movie_id_fk FOREIGN KEY (movie_id) REFERENCES movie(id);


--
-- Name: account_role account_role_account_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_role
    ADD CONSTRAINT account_role_account_id_fk FOREIGN KEY (account_id) REFERENCES account(id);


--
-- Name: account_role account_role_role_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_role
    ADD CONSTRAINT account_role_role_id_fk FOREIGN KEY (role_id) REFERENCES role(id);


--
-- Name: basket_voucher basket_voucher_basket_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY basket_voucher
    ADD CONSTRAINT basket_voucher_basket_id_fk FOREIGN KEY (basket_id) REFERENCES basket(id);


--
-- Name: basket_voucher basket_voucher_voucher_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY basket_voucher
    ADD CONSTRAINT basket_voucher_voucher_id_fk FOREIGN KEY (voucher_id) REFERENCES voucher(id);


--
-- Name: basket fk_basket_account; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY basket
    ADD CONSTRAINT fk_basket_account FOREIGN KEY (account_id) REFERENCES account(id);


--
-- Name: basket_item fk_basket_item_basket; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY basket_item
    ADD CONSTRAINT fk_basket_item_basket FOREIGN KEY (basket_id) REFERENCES basket(id);


--
-- Name: basket_item fk_basket_item_movie; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY basket_item
    ADD CONSTRAINT fk_basket_item_movie FOREIGN KEY (movie_id) REFERENCES movie(id);


--
-- Name: movie fk_movie_classification; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY movie
    ADD CONSTRAINT fk_movie_classification FOREIGN KEY (classification) REFERENCES classification(id);


--
-- Name: movie fk_movie_genre; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY movie
    ADD CONSTRAINT fk_movie_genre FOREIGN KEY (genre) REFERENCES genre(id);


--
-- Name: movie_price movie_price_movie_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY movie_price
    ADD CONSTRAINT movie_price_movie_id_fk FOREIGN KEY (movie_id) REFERENCES movie(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

