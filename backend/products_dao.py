from sql_connection import get_sql_connection


def get_all_products(connection):
    cursor = connection.cursor()
    query = ("SELECT products.product_id, products.name, products.uom_id, products.price_per_unit,"
             "uom.name AS uom_name FROM products INNER JOIN uom ON products.uom_id = uom.uom_id")
    cursor.execute(query)
    rows = cursor.fetchall()

    response = []

    # print(f"{'ID':<5} {'Name':<20} {'uom_ID':<10} {'Price':<10} {'uom_name':<15}")
    # print("-" * 60)

    for product_id, name, uom_id, price_per_unit, uom_name in rows:
        response.append({
            "product_id": product_id,
            "name": name,
            "uom_id": uom_id,
            "price_per_unit": price_per_unit,
            "uom_name": uom_name
        })

        # print(f"{product_id:<5} {name:<20} {uom_id:<10} {price_per_unit:<10} {uom_name:<15}")

    cursor.close()
    return response


def insert_new_product(connection, product):
    cursor = connection.cursor()
    queue = "insert into products (name, uom_id, price_per_unit)values(%s, %s, %s)"
    data = (product['name'], product['uom_id'], product['price_per_unit'])
    cursor.execute(queue, data)
    connection.commit()

    return cursor.lastrowid


def delete_product(connection, product_id):
    cursor = connection.cursor()
    queue = "delete from products where product_id = %s"
    cursor.execute(queue, (product_id,))
    connection.commit()

    return cursor.rowcount


def update_product(connection, product_id, name, uom_id, price_per_unit):
    cursor = connection.cursor()
    query = ("UPDATE products SET name = %s, uom_id = %s, price_per_unit = %s "
             "WHERE product_id = %s")
    data = (name, uom_id, price_per_unit, product_id)
    cursor.execute(query, data)
    connection.commit()
    return True


if __name__ == '__main__':
    conn = get_sql_connection()
    print(get_all_products(conn))

    # print(insert_new_product(conn, {
    #     'product_name': 'cabbage', 'uom_id': '1', 'price_per_unit': '10'}))
    # print(delete_product(conn, '10'))
