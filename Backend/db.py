import sqlite3

class MyDataBase:
    def __init__(self):
        connection = sqlite3.connect("./database.db")
        self.cursor = connection.cursor()
    def createTables(self):
        self.cursor.execute("""CREATE TABLE IF NOT EXISTS images (
                            id INTEGER PRIMARY KEY,
                            url TEXT,
                            status TEXT,
                            x INTEGER,
                            y INTEGER,
                            w INTEGER,
                            h INTEGER
                            )
                        """)
    def addImage(self,url,status,x,y,w,h):
        # print("entering",url,status,x,y,w,h)
        self.cursor.execute("""INSERT INTO images(
                        url,
                        status,
                        x,
                        y,
                        w,
                        h
                    )
                    VALUES(
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                       )

        """,(url, status, x, y, w ,h))

    def updateImageStatus(self,status,id):
        self.cursor.execute("""UPDATE images set status = ? WHERE id = ? 
        """,(status, id))

    def listImages(self):
        self.cursor.execute("""SELECT * FROM images""")
        return self.cursor.fetchall()
#***********************************************




#*************************************************

if(__name__=="__main__"):
    # createTables(cursor)
    # for i in range(10):
        # addImage(cursor,f"url{i}",f"status{i}",None,1,1,1)


    # updateImageStatus(cursor,"undefined",1)
    # connection.commit()

    mydb=MyDataBase()

    print(mydb.listImages()[0])

