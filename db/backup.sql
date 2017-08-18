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
    movie_id integer,
    favorite boolean
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
    account_id integer,
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
    description text,
    rating integer,
    director text,
    main_cast text,
    purchasable boolean DEFAULT true,
    image text DEFAULT 'default.jpg'::text,
    price numeric
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
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE reviews (
    review_id integer NOT NULL,
    account_id integer NOT NULL,
    movie_id integer NOT NULL,
    comments character varying(140),
    score double precision
);


ALTER TABLE reviews OWNER TO postgres;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE reviews_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE reviews_review_id_seq OWNER TO postgres;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE reviews_review_id_seq OWNED BY reviews.review_id;


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
    id integer NOT NULL,
    global boolean DEFAULT false NOT NULL,
    expire date DEFAULT '2020-01-01'::date NOT NULL
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
-- Name: wishlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE wishlist (
    account_id integer,
    id integer NOT NULL
);


ALTER TABLE wishlist OWNER TO postgres;

--
-- Name: wishlist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE wishlist_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE wishlist_id_seq OWNER TO postgres;

--
-- Name: wishlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE wishlist_id_seq OWNED BY wishlist.id;


--
-- Name: wishlist_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE wishlist_item (
    movie_id integer,
    wishlist_id integer,
    id integer NOT NULL
);


ALTER TABLE wishlist_item OWNER TO postgres;

--
-- Name: wishlist_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE wishlist_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE wishlist_item_id_seq OWNER TO postgres;

--
-- Name: wishlist_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE wishlist_item_id_seq OWNED BY wishlist_item.id;


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
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reviews ALTER COLUMN review_id SET DEFAULT nextval('reviews_review_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY role ALTER COLUMN id SET DEFAULT nextval('role_id_seq'::regclass);


--
-- Name: voucher id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY voucher ALTER COLUMN id SET DEFAULT nextval('voucher_id_seq'::regclass);


--
-- Name: wishlist id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY wishlist ALTER COLUMN id SET DEFAULT nextval('wishlist_id_seq'::regclass);


--
-- Name: wishlist_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY wishlist_item ALTER COLUMN id SET DEFAULT nextval('wishlist_item_id_seq'::regclass);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"User_id_seq"', 60, true);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY account (id, firstname, lastname, email_address, password) FROM stdin;
8	admin	password	eamonn.boyle3@instil.co	425be9b26d17bb9ddde20bf5617a0ae5408ef68c4b3e6d060311c3dec23e9e0430692654b66af568
18	admin	admin	admin	3717e9035ba54fc5a8ca904d7fc06724cc2fde6a6204a98925be587fc229b453150cf9bd173853c8
54	dsdgs	sdg	sxfdgf	2e7ac89a37990aacfc0bebc21d04da5ee028f51d0b6a572455432b09b3287cd7ca8e9e8298034818
55	jh	ph	mail@k.com	5cde1650b6b9212d5d2878873b92ff138079bfcec4243c9fb8eadeb8d163a8683ebed51834be0618
56	ij	jij	mail@mail.com	d74d7157683ad98750d0e08fbb378983eee1f969fce042cbf5d2f6e3143130b1261f8d75c5b6eb99
57	Alán	Quigley	asas@gyhdgf.com	077b834b8b7d818780378be872ef78e0828805620ef58f134ef4fe93fee9dc0f0a7ec46592da3597
58	dg	fg	mail.mail@mail.com	2c36bb148233f6c3fcde6435f0fd50afea38ee3e5ca62019e38710eeeab9ecd6e362a33bcb4bf42d
59	Yvonne	Phoenix	test@test.com	5941f2498c8786a284f3f25cbf3fcf33872118f013a9e66a6d768dd2499e47878358917914cf9875
60	john	doe	demo@demo.com	f1bf994695b2fa8a2316e13e551de08eb87d1e4d62e54f49b07fb6eb63b01eeb1cd8d70503bb9132
\.


--
-- Data for Name: account_movie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY account_movie (id, account_id, movie_id, favorite) FROM stdin;
116	59	8	t
114	59	7	f
108	18	11	f
113	18	12	f
111	18	6	f
76	56	6	f
77	56	7	f
107	18	9	f
117	60	7	\N
105	58	13	f
106	58	7	f
110	18	10	f
112	18	8	f
109	18	7	t
\.


--
-- Name: account_movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('account_movie_id_seq', 117, true);


--
-- Data for Name: account_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY account_role (role_id, account_id, id) FROM stdin;
1	8	1
1	18	2
2	18	3
1	56	38
1	57	39
1	58	40
1	59	41
1	60	42
\.


--
-- Name: account_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('account_role_id_seq', 42, true);


--
-- Data for Name: basket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY basket (account_id, id) FROM stdin;
56	50
\.


--
-- Name: basket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('basket_id_seq', 54, true);


--
-- Data for Name: basket_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY basket_item (id, movie_id, basket_id) FROM stdin;
222	9	\N
221	8	\N
227	10	\N
233	11	50
238	13	\N
244	13	\N
245	13	\N
249	10	\N
250	6	\N
\.


--
-- Name: basket_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('basket_item_id_seq', 251, true);


--
-- Data for Name: basket_voucher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY basket_voucher (account_id, voucher_id) FROM stdin;
59	81
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
7	16
\.


--
-- Name: classification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('classification_id_seq', 16, true);


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY genre (id, value) FROM stdin;
5	Horror
6	Comedy
7	Family
8	Science Fiction
1	Action
2	Romance
3	Animation
\.


--
-- Name: genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('genre_id_seq', 8, true);


--
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY movie (id, title, year, genre, classification, description, rating, director, main_cast, purchasable, image, price) FROM stdin;
7	Commando	1985	1	7	Retired Special Forces soldier John Matrix lives with daughter Jenny in isolation, but his privacy is disturbed by former commander Franklin Kirby , who warns him that his fellow soldiers are getting killed one by one	1	Mark	Arnold Schwarzenegger, Alyssa Milano , James Olson	t	commando.jpg\n	2.7
10	True Lies	1996	8	13	Secretly a spy but thought by his family to be a dull salesman, Harry Tasker (Arnold Schwarzenegger) is tracking down nuclear missiles in the possession of Islamic jihadist Aziz (Art Malik). Harry's mission is complicated when he realizes his neglected wife, Helen (Jamie Lee Curtis), is contemplating an affair with Simon (Bill Paxton), a used-car salesman who claims he's a spy	1	Mark	Arnold SFChudshfodbhfkjdb	t	true_lies.jpg	2.8
6	The Terminator  	1999	5	14	Disguised as a human, a cyborg assassin known as a Terminator (Arnold Schwarzenegger) travels from 2029 to 1984 to kill Sarah Connor (Linda Hamilton). Sent to protect Sarah is Kyle Reese (Michael Biehn), who divulges the coming of Skynet, an artificial intelligence system that will spark a nuclear holocaust. Sarah is targeted because Skynet knows that her unborn son will lead the fight against them	1	alan	arnold	t	terminator.jpg	3.34
11	Eraser	1996	5	14	John "The Eraser" Kruger is the top gun in the US Marshall Witness Protection scheme	1	alan	arnold	t	eraser.jpg	2.99
12	Big Hero 6	2014	3	9	Robotics prodigy Hiro (Ryan Potter) lives in the city of San Fransokyo	\N	Don Hall, Chris Williams	T.J Miller ,Ryan Potter	t	bigHero6.jpg	3
13	The Departed	2006	1	14	South Boston cop Billy Costigan (Leonardo DiCaprio) goes under cover to infiltrate the organization of gangland chief Frank Costello (Jack Nicholson). As Billy gains the mobster's trust, a career criminal named Colin Sullivan (Matt Damon) infiltrates the police department and reports on its activities	\N	Martin Scorsese	Leonardo DI Caprio	t	departed.jpg	2
8	Predator	1987	5	14	Dutch (Arnold Schwarzenegger), a soldier of fortune, is hired by the U.S. government to secretly rescue a group of politicians trapped in Guatemala. But when Dutch and his team, which includes weapons expert Blain (Jesse Ventura) and CIA agent George (Carl Weathers), land in Central America, something is gravely wrong	1	alan	arnold	f	predator.jpg	3
9	Total Recall	1990	5	14	Douglas Quaid (Arnold Schwarzenegger) is a bored construction worker in the year 2084 who dreams of visiting the colonized Mars	1	alan	arnold	f	total_recall.jpg	2.37
25	test	2009	3	14	description	\N	martin	cast	t	default.jpg	2
\.


--
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('movie_id_seq', 25, true);


--
-- Data for Name: movie_price; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY movie_price (movie_id, price) FROM stdin;
11	2
8	2.99
6	2.99
9	2
10	2.6
7	2.96
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY reviews (review_id, account_id, movie_id, comments, score) FROM stdin;
10	18	13	good	5
11	56	13	great	4.5
12	56	7	this was okay..... too flashy	2.5
13	18	10	hnzdfhn	3
14	18	6	cvn	2.5
16	18	11	vbmn	4
19	18	12	 vn	4.5
20	18	9	xcvmn	3.5
21	18	8	xbm,	4
22	18	7	amazing!	5
\.


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('reviews_review_id_seq', 23, true);


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

COPY voucher (offer, name, id, global, expire) FROM stdin;
12% OFF	KIDS	75	f	2017-08-01
SPEND 50 GET 10 OFF	SUPERFRY	79	f	2017-08-15
BUY 1 GET 1 FREE	KIDSYHUJK	80	f	2017-09-16
BUY 1 GET 1 FREE	DEMO2	82	f	2017-08-31
SPEND 5 GET 2 OFF	DEMO3	84	f	2017-08-23
20% OFF	STUDENT	85	f	2017-08-19
BUY 2 GET 3 FREE	TEST	86	f	2017-08-19
10% OFF	DEMO	81	t	2017-08-31
\.


--
-- Name: voucher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('voucher_id_seq', 86, true);


--
-- Data for Name: wishlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY wishlist (account_id, id) FROM stdin;
58	1
18	2
59	3
60	4
\.


--
-- Name: wishlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('wishlist_id_seq', 4, true);


--
-- Data for Name: wishlist_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY wishlist_item (movie_id, wishlist_id, id) FROM stdin;
11	1	3
7	\N	7
8	\N	9
10	3	10
13	\N	6
13	\N	11
13	\N	12
13	2	13
10	\N	14
6	\N	15
\.


--
-- Name: wishlist_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('wishlist_item_id_seq', 15, true);


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
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


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
-- Name: fki_basket_voucher_account_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_basket_voucher_account_id_fk ON basket_voucher USING btree (account_id);


--
-- Name: fki_fk_wishlist_account; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_wishlist_account ON wishlist USING btree (account_id);


--
-- Name: fki_fk_wishlist_item_movie; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_wishlist_item_movie ON wishlist_item USING btree (movie_id);


--
-- Name: fki_fk_wishlist_item_wishlist; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_wishlist_item_wishlist ON wishlist_item USING btree (wishlist_id);


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
-- Name: basket_voucher basket_voucher_account_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY basket_voucher
    ADD CONSTRAINT basket_voucher_account_id_fk FOREIGN KEY (account_id) REFERENCES account(id);


--
-- Name: basket_voucher basket_voucher_voucher_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY basket_voucher
    ADD CONSTRAINT basket_voucher_voucher_id_fk FOREIGN KEY (voucher_id) REFERENCES voucher(id);


--
-- Name: reviews fk_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reviews
    ADD CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES account(id);


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
-- Name: reviews fk_movie_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reviews
    ADD CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) REFERENCES movie(id);


--
-- Name: wishlist fk_wishlist_account; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY wishlist
    ADD CONSTRAINT fk_wishlist_account FOREIGN KEY (account_id) REFERENCES account(id);


--
-- Name: wishlist_item fk_wishlist_item_movie; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY wishlist_item
    ADD CONSTRAINT fk_wishlist_item_movie FOREIGN KEY (movie_id) REFERENCES movie(id);


--
-- Name: movie_price movie_price_movie_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY movie_price
    ADD CONSTRAINT movie_price_movie_id_fk FOREIGN KEY (movie_id) REFERENCES movie(id);


--
-- PostgreSQL database dump complete
--

