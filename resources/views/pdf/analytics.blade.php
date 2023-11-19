<html lang="es">

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Figtree&display=swap" rel="stylesheet">

    <style>
        body {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: Figtree, sans-serif;
        }

        h1,
        h2,
        table {
            text-align: center;
        }

        table {
            margin: 2rem auto;
            width: 100%;
            border-collapse: collapse;


        }

        td,
        th {
            padding: 1rem;
        }

        table,
        th,
        td {
            border: 1px solid !important;
        }

        th{
            background-color: #d1d5db;
        }

        .header {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .header img {
            height: 100px;
        }

        .logo {
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="header">

        <div>
            <h1>Reporte</h1>
            <h2>{{$title}}</h2>
        </div>
        <div class="logo">
            Kite - Todo en un solo lugar
        </div>
    </div>
    <table>
        <tr>
            <th>Pos.</th>
            <th>Item ID</th>
            <th>Item</th>
            <th>Cantidad</th>
        </tr>

        @foreach ($data as $item)
        <tr>
            <td>{{$item['pos']}}</td>
            <td>{{$item['itemId']}}</td>
            <td>{{$item['item']}}</td>
            <td>{{$item['cantidad']}}</td>
        </tr>
        @endforeach
    </table>
</body>

</html>