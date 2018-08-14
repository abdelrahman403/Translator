:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_error)).
:- use_module(library(http/http_parameters)).

:- consult('dataset.pl').

% main server loop
server(Port) :-
        http_server(http_dispatch, [port(Port)]).
        
headers:-
        format('Access-Control-Allow-Origin: *~n'), % for access
        format('Content-type: application/json; charset=utf-8~n~n').

% root path handler
:- http_handler(/, request_response, []).
request_response(Request) :-
        headers,
        http_parameters(Request, [ query(Q, []) ]),        % to validate various parameters in one place
        translate(Q, R),
        format('~p', [R]).


