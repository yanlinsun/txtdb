# txtdb
Simple DB in Plain Text File

##Format
###Database
File ends with 'db'. Example: Sample.db
It is plain AscII text file with UTF-8 encoding.

###Name
String without space or square bracketed string with space character.
E.g. Material, [Three Words Table]

###Table
Pattern: Table: <Table_Name>-><Global_Table_Identifier>
Like:
    Table: Material->m
    Table: [Three Words Table]->3wt

###Foreign Key
Position: Right after Table line.
Pattern: <Column_Name>: <Global_Table_Identifier>.<Column_Name>

###Columns Line
Position: Follow Foreign Key or Table Line
Pattern: <Column1_Name><Tab><Column2_Name>...

###Records
Position: Follow Columns Line
Pattern: <Column1_Value><Tab><Column2_Value>...
Record is case-insensitive.


Sample DB File:
------------------------------------------
Table: UOM_Category->unc
Category    Description
Weight      Weight
Length      Length
Temp        Tempurature
Vol         Volume

Table: UOM->un
Category:unc.Category
UOM     Name        Category 
KG      Kilogram    Weight
CM      Centimeter  Length
C       Celcius     Temp
m3      Cubic Meter vol

Table: Material->m
BaseUOM:un.UOM
Material    BaseUOM
Wood        m3          

