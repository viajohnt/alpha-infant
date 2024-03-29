"""add favorite_food to baby model

Revision ID: 180eb12409a9
Revises: 9d4d41b38854
Create Date: 2023-06-25 20:09:16.282769

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '180eb12409a9'
down_revision = '9d4d41b38854'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('babies', schema=None) as batch_op:
        batch_op.add_column(sa.Column('favorite_food', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('babies', schema=None) as batch_op:
        batch_op.drop_column('favorite_food')

    # ### end Alembic commands ###
