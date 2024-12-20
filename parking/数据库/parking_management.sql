PGDMP                     	    |            parkingmanagement    15.4    15.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    73732    parkingmanagement    DATABASE     s   CREATE DATABASE parkingmanagement WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
 !   DROP DATABASE parkingmanagement;
                11024    false                        2615    73872    parkingcard    SCHEMA        CREATE SCHEMA parkingcard;
    DROP SCHEMA parkingcard;
                11024    false            �            1259    73873    garage    TABLE     �   CREATE TABLE parkingcard.garage (
    parkingspace_id character varying(50) NOT NULL,
    total_number integer NOT NULL,
    remain_number integer NOT NULL,
    id character varying(50)
);
    DROP TABLE parkingcard.garage;
       parkingcard         heap    11024    false    5            �            1259    73876    operator    TABLE     �   CREATE TABLE parkingcard.operator (
    id character varying(50) NOT NULL,
    name character varying(50) NOT NULL,
    sex character varying(50) NOT NULL,
    age integer NOT NULL
);
 !   DROP TABLE parkingcard.operator;
       parkingcard         heap    11024    false    5            �            1259    73879    parkingcard    TABLE     �   CREATE TABLE parkingcard.parkingcard (
    card_id character varying(50) NOT NULL,
    card_type character varying(10),
    balance real,
    id character varying(50)
);
 $   DROP TABLE parkingcard.parkingcard;
       parkingcard         heap    11024    false    5            �            1259    73882    record    TABLE     �   CREATE TABLE parkingcard.record (
    record_no character varying(50) NOT NULL,
    timein date,
    timeout date,
    timetotal integer,
    cost character varying(20),
    vehicle_no character varying(20)
);
    DROP TABLE parkingcard.record;
       parkingcard         heap    11024    false    5            �            1259    73885    vehicle    TABLE     �   CREATE TABLE parkingcard.vehicle (
    vehicle_no character varying(20) NOT NULL,
    timein date NOT NULL,
    card_id character varying(50) NOT NULL
);
     DROP TABLE parkingcard.vehicle;
       parkingcard         heap    11024    false    5                      0    73873    garage 
   TABLE DATA           W   COPY parkingcard.garage (parkingspace_id, total_number, remain_number, id) FROM stdin;
    parkingcard          11024    false    214   �                 0    73876    operator 
   TABLE DATA           ;   COPY parkingcard.operator (id, name, sex, age) FROM stdin;
    parkingcard          11024    false    215                    0    73879    parkingcard 
   TABLE DATA           K   COPY parkingcard.parkingcard (card_id, card_type, balance, id) FROM stdin;
    parkingcard          11024    false    216   5                 0    73882    record 
   TABLE DATA           ^   COPY parkingcard.record (record_no, timein, timeout, timetotal, cost, vehicle_no) FROM stdin;
    parkingcard          11024    false    217   �                 0    73885    vehicle 
   TABLE DATA           C   COPY parkingcard.vehicle (vehicle_no, timein, card_id) FROM stdin;
    parkingcard          11024    false    218   �       u           2606    73937    garage garage_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY parkingcard.garage
    ADD CONSTRAINT garage_pkey PRIMARY KEY (parkingspace_id);
 A   ALTER TABLE ONLY parkingcard.garage DROP CONSTRAINT garage_pkey;
       parkingcard            11024    false    214            w           2606    73939    operator operator_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY parkingcard.operator
    ADD CONSTRAINT operator_pkey PRIMARY KEY (id);
 E   ALTER TABLE ONLY parkingcard.operator DROP CONSTRAINT operator_pkey;
       parkingcard            11024    false    215            y           2606    73941    parkingcard parkingcard_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY parkingcard.parkingcard
    ADD CONSTRAINT parkingcard_pkey PRIMARY KEY (card_id);
 K   ALTER TABLE ONLY parkingcard.parkingcard DROP CONSTRAINT parkingcard_pkey;
       parkingcard            11024    false    216            {           2606    73943    record record_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY parkingcard.record
    ADD CONSTRAINT record_pkey PRIMARY KEY (record_no);
 A   ALTER TABLE ONLY parkingcard.record DROP CONSTRAINT record_pkey;
       parkingcard            11024    false    217            }           2606    73945    vehicle vehicle_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY parkingcard.vehicle
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY (vehicle_no);
 C   ALTER TABLE ONLY parkingcard.vehicle DROP CONSTRAINT vehicle_pkey;
       parkingcard            11024    false    218            ~           2606    73970    garage garage_id_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY parkingcard.garage
    ADD CONSTRAINT garage_id_fkey FOREIGN KEY (id) REFERENCES parkingcard.operator(id);
 D   ALTER TABLE ONLY parkingcard.garage DROP CONSTRAINT garage_id_fkey;
       parkingcard          11024    false    215    214    3191                       2606    73975    parkingcard parkingcard_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY parkingcard.parkingcard
    ADD CONSTRAINT parkingcard_id_fkey FOREIGN KEY (id) REFERENCES parkingcard.operator(id);
 N   ALTER TABLE ONLY parkingcard.parkingcard DROP CONSTRAINT parkingcard_id_fkey;
       parkingcard          11024    false    3191    215    216            �           2606    73980    record record_vehicle_no_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY parkingcard.record
    ADD CONSTRAINT record_vehicle_no_fkey FOREIGN KEY (vehicle_no) REFERENCES parkingcard.vehicle(vehicle_no) NOT VALID;
 L   ALTER TABLE ONLY parkingcard.record DROP CONSTRAINT record_vehicle_no_fkey;
       parkingcard          11024    false    218    217    3197            �           2606    73985    vehicle vehicle_card_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY parkingcard.vehicle
    ADD CONSTRAINT vehicle_card_id_fkey FOREIGN KEY (card_id) REFERENCES parkingcard.parkingcard(card_id);
 K   ALTER TABLE ONLY parkingcard.vehicle DROP CONSTRAINT vehicle_card_id_fkey;
       parkingcard          11024    false    3193    218    216               A   x�-��	�0E��TL���C��#���0a%Y�)���5Th��
h��֯���B!8�����,b         !   x��400�|�g����ϧl�4������� ~&�         }   x�1400�|6�����O{r�pF��B�F��;w>_�����Ŗ� i#dicΧM+�6�I#K�p>ٱ���m 	C#$	S$	$q3�L��3Gr �,��3C�Dr�9�Cd��$b���� �Cd`         �   x�}ѱ�0����%���g;�+$ZZ�a:&H�D���ı��R8����	���py ��h�yM�L�ˋ��5�F�'���p�p�>���ת9z#
Nڧ�kH���+i?n+:+E�����P�����R���(���y��^:k�V H��Bf�Y{o/k��Nh�         u   x�]ϻ	�P����$�/-o%�j�2b�6N$�r��?��9�*bʍ���S��Y�Y���()h�_���F�!���!��U�T���OŨ�
<��[�D�K�֎�>�*C^     